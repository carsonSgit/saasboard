-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'agency');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid', 'trialing');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  subscription_tier subscription_tier DEFAULT 'free',
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monitors table (website monitoring configs)
CREATE TABLE public.monitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  check_interval INTEGER DEFAULT 300,
  is_active BOOLEAN DEFAULT true,
  notification_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checks table (performance data)
CREATE TABLE public.checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  monitor_id UUID REFERENCES public.monitors(id) ON DELETE CASCADE,
  response_time INTEGER,
  status_code INTEGER,
  is_up BOOLEAN NOT NULL,
  error_message TEXT,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incidents table (downtime tracking)
CREATE TABLE public.incidents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  monitor_id UUID REFERENCES public.monitors(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE,
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX idx_monitors_user_id ON monitors(user_id);
CREATE INDEX idx_monitors_is_active ON monitors(is_active);
CREATE INDEX idx_checks_monitor_id ON checks(monitor_id);
CREATE INDEX idx_checks_checked_at ON checks(checked_at);
CREATE INDEX idx_incidents_monitor_id ON incidents(monitor_id);
CREATE INDEX idx_incidents_is_resolved ON incidents(is_resolved);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitors_updated_at BEFORE UPDATE ON monitors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Monitors policies
CREATE POLICY "Users can view own monitors" ON monitors
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own monitors" ON monitors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own monitors" ON monitors
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own monitors" ON monitors
    FOR DELETE USING (auth.uid() = user_id);

-- Checks policies (users can view checks for their monitors)
CREATE POLICY "Users can view checks for own monitors" ON checks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM monitors 
            WHERE monitors.id = checks.monitor_id 
            AND monitors.user_id = auth.uid()
        )
    );

-- Incidents policies (users can view incidents for their monitors)
CREATE POLICY "Users can view incidents for own monitors" ON incidents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM monitors 
            WHERE monitors.id = incidents.monitor_id 
            AND monitors.user_id = auth.uid()
        )
    );

-- Service role can do everything (for server-side operations)
CREATE POLICY "Service role full access" ON profiles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON monitors
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON checks
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON incidents
    FOR ALL USING (auth.role() = 'service_role');

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_user_subscription_tier(user_uuid UUID)
RETURNS subscription_tier AS $$
DECLARE
    tier subscription_tier;
BEGIN
    SELECT subscription_tier INTO tier
    FROM profiles
    WHERE id = user_uuid;
    
    RETURN COALESCE(tier, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check monitor limits based on subscription
CREATE OR REPLACE FUNCTION check_monitor_limit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_count INTEGER;
    user_tier subscription_tier;
BEGIN
    user_tier := get_user_subscription_tier(user_uuid);
    
    SELECT COUNT(*) INTO current_count
    FROM monitors
    WHERE user_id = user_uuid;
    
    -- Define limits based on subscription tier
    CASE user_tier
        WHEN 'free' THEN RETURN current_count < 1;
        WHEN 'pro' THEN RETURN current_count < 10;
        WHEN 'agency' THEN RETURN current_count < 50;
        ELSE RETURN current_count < 1;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get check interval based on subscription
CREATE OR REPLACE FUNCTION get_min_check_interval(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    user_tier subscription_tier;
BEGIN
    user_tier := get_user_subscription_tier(user_uuid);
    
    CASE user_tier
        WHEN 'free' THEN RETURN 300; -- 5 minutes
        WHEN 'pro' THEN RETURN 60;   -- 1 minute
        WHEN 'agency' THEN RETURN 30; -- 30 seconds
        ELSE RETURN 300;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
