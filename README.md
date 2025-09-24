# SaaSBoard - Website Performance Monitor

A complete micro-SaaS website uptime and performance monitoring tool with beautiful analytics dashboards. Users can monitor their websites, view performance metrics, and get alerts when sites go down.

## 🚀 Core Value Proposition

"Know instantly when your website goes down, with beautiful dashboards that impress your clients"

## 🏗️ Tech Stack

- **Frontend**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (subscriptions + one-time)
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Monitoring**: Custom HTTP monitoring system

## 📁 Project Structure

```
/src
  /app
    /api
      /monitors
        /route.ts                    # GET (list), POST (create)
        /[id]/route.ts              # GET (single), PUT (update), DELETE
        /[id]/checks/route.ts       # GET (check history)
      /cron
        /monitor/route.ts           # Vercel cron job for monitoring
    /dashboard
      /page.tsx                     # Main dashboard with stats
    /page.tsx                       # Landing page
    /layout.tsx                     # Root layout
    /globals.css                    # Global styles
  /components
    /ui/                            # shadcn/ui components
      /button.tsx
      /card.tsx
      /badge.tsx
    /dashboard/
      /stats-cards.tsx              # Dashboard stats cards
      /status-badge.tsx             # Status indicator
  /lib
    /supabase.ts                    # Supabase client setup
    /monitoring.ts                  # HTTP check logic
    /calculations.ts                # Stats calculations
    /subscriptions.ts               # Subscription logic
    /utils.ts                       # Utility functions
  /types
    /database.ts                    # Generated Supabase types
/supabase
  /migrations
    /20240101000000_initial_schema.sql
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd C:\Users\DevUser\Documents\saasboard
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env.local
   # No external services required - uses mock data by default
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 🔧 Core Features

### ✅ Website Monitoring (Mock Data)
- HTTP monitoring simulation with configurable intervals
- Response time tracking and visualization
- Status code monitoring
- Incident tracking and resolution

### ✅ Analytics Dashboard
- Real-time uptime statistics
- Performance metrics visualization with charts
- Monitor status overview with color-coded badges
- Historical data tracking (7 days of mock data)

### ✅ Monitor Management
- Add, edit, and delete monitors
- Toggle monitor active/inactive status
- View detailed monitor information
- Real-time status updates

### ✅ Subscription System (UI Only)
- Three-tier pricing display (Free, Pro, Agency)
- Subscription tier management interface
- Settings and billing pages
- Feature limitation simulation

## 📊 Subscription Tiers

### Free Tier
- 1 Monitor
- 5-minute check intervals
- 7-day data retention
- Basic alerts

### Pro Tier ($15/month)
- 10 Monitors
- 1-minute check intervals
- 30-day data retention
- Email alerts

### Agency Tier ($49/month)
- 50 Monitors
- 30-second check intervals
- 90-day data retention
- Advanced alerts

## 🛠️ Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Format
npm run format

# Database
npm run db:generate
npm run db:migrate
npm run db:reset

# Deploy
npm run deploy
```

## 🔧 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
CRON_SECRET=your-cron-secret

# Debug Mode
DEBUG=true
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run deploy
```

### Environment Variables
Make sure to set all required environment variables in your deployment platform.

## 📈 Key Components

### HTTP Monitoring Function
The core monitoring logic checks website availability and performance:

```typescript
export async function checkWebsite(url: string): Promise<CheckResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'UptimeMonitor/1.0'
      }
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      isUp: response.ok,
      responseTime,
      statusCode: response.status,
      errorMessage: response.ok ? null : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      isUp: false,
      responseTime: Date.now() - startTime,
      statusCode: 0,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

### Background Monitoring
Vercel Cron jobs run every minute to check all active monitors and store results in the database.

### Stats Calculation
Real-time calculation of uptime percentages, average response times, and incident counts.

## 🎯 Success Metrics

### Development Speed
- Time to first deployment: < 2 hours
- Time to first payment: < 1 day
- Time to feature addition: < 30 minutes

### Business Metrics
- Conversion rate tracking
- Revenue per user
- Churn rate monitoring
- Feature usage analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@yourdomain.com or join our Discord community.

---

**Remember**: Ship fast, iterate faster. Perfect is the enemy of shipped. 🚀