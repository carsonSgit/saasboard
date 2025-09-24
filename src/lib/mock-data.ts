import { Database } from '@/types/database'

type Monitor = Database['public']['Tables']['monitors']['Row']
type Check = Database['public']['Tables']['checks']['Row']
type Incident = Database['public']['Tables']['incidents']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

// Mock user profile
export const mockProfile: Profile = {
  id: 'mock-user-id',
  email: 'demo@saasboard.com',
  full_name: 'Demo User',
  subscription_tier: 'pro',
  stripe_customer_id: 'cus_mock',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
}

// Mock monitors
export const mockMonitors: Monitor[] = [
  {
    id: '1',
    user_id: 'mock-user-id',
    name: 'My Website',
    url: 'https://example.com',
    check_interval: 300,
    is_active: true,
    notification_email: 'admin@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'mock-user-id',
    name: 'API Server',
    url: 'https://api.example.com',
    check_interval: 60,
    is_active: true,
    notification_email: 'admin@example.com',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    user_id: 'mock-user-id',
    name: 'Blog',
    url: 'https://blog.example.com',
    check_interval: 300,
    is_active: false,
    notification_email: 'admin@example.com',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  }
]

// Generate mock checks for the last 7 days
export const mockChecks: Check[] = generateMockChecks()

// Generate mock incidents
export const mockIncidents: Incident[] = [
  {
    id: '1',
    monitor_id: '1',
    started_at: '2024-01-15T10:30:00Z',
    resolved_at: '2024-01-15T10:45:00Z',
    is_resolved: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    monitor_id: '2',
    started_at: '2024-01-20T14:20:00Z',
    resolved_at: null,
    is_resolved: false,
    created_at: '2024-01-20T14:20:00Z'
  }
]

function generateMockChecks(): Check[] {
  const checks: Check[] = []
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  // Generate checks for each monitor
  mockMonitors.forEach(monitor => {
    const checkInterval = monitor.check_interval * 1000 // Convert to milliseconds
    let currentTime = sevenDaysAgo.getTime()
    
    while (currentTime < now.getTime()) {
      // Simulate realistic response times and occasional failures
      const isUp = Math.random() > 0.05 // 95% uptime
      const responseTime = isUp ? 
        Math.floor(Math.random() * 2000) + 100 : // 100-2100ms for up
        Math.floor(Math.random() * 5000) + 1000  // 1000-6000ms for down
      
      const statusCode = isUp ? 
        (Math.random() > 0.1 ? 200 : (Math.random() > 0.5 ? 301 : 404)) : // Mostly 200, some redirects/404s
        0 // 0 for down
      
      checks.push({
        id: `check-${monitor.id}-${currentTime}`,
        monitor_id: monitor.id,
        response_time: responseTime,
        status_code: statusCode,
        is_up: isUp,
        error_message: isUp ? null : 'Connection timeout',
        checked_at: new Date(currentTime).toISOString()
      })
      
      currentTime += checkInterval
    }
  })
  
  return checks.sort((a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime())
}

// Mock API functions
export const mockApi = {
  // Get monitors
  getMonitors: async (): Promise<Monitor[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    return mockMonitors
  },

  // Get checks for a monitor
  getChecks: async (monitorId: string): Promise<Check[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockChecks.filter(check => check.monitor_id === monitorId)
  },

  // Get all checks
  getAllChecks: async (): Promise<Check[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockChecks
  },

  // Get incidents
  getIncidents: async (): Promise<Incident[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockIncidents
  },

  // Create monitor
  createMonitor: async (data: Partial<Monitor>): Promise<Monitor> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const newMonitor: Monitor = {
      id: `monitor-${Date.now()}`,
      user_id: 'mock-user-id',
      name: data.name || 'New Monitor',
      url: data.url || 'https://example.com',
      check_interval: data.check_interval || 300,
      is_active: data.is_active ?? true,
      notification_email: data.notification_email || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockMonitors.push(newMonitor)
    return newMonitor
  },

  // Update monitor
  updateMonitor: async (id: string, data: Partial<Monitor>): Promise<Monitor> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const index = mockMonitors.findIndex(m => m.id === id)
    if (index !== -1) {
      mockMonitors[index] = { ...mockMonitors[index], ...data, updated_at: new Date().toISOString() }
      return mockMonitors[index]
    }
    throw new Error('Monitor not found')
  },

  // Delete monitor
  deleteMonitor: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = mockMonitors.findIndex(m => m.id === id)
    if (index !== -1) {
      mockMonitors.splice(index, 1)
    }
  },

  // Get user profile
  getProfile: async (): Promise<Profile> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProfile
  }
}

// Mock Team Members
export const mockTeamMembers = [
  {
    id: 'user_001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'active',
    last_active: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    avatar: null,
  },
  {
    id: 'user_002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'active',
    last_active: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    avatar: null,
  },
  {
    id: 'user_003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'pending',
    last_active: null,
    avatar: null,
  },
];

// Mock Billing Data
export const mockBillingData = {
  current_plan: 'pro',
  next_billing_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
  amount: 15.00,
  currency: 'USD',
  invoices: [
    {
      id: 'inv_001',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Pending',
      download_url: '#',
    },
    {
      id: 'inv_002',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Failed',
      download_url: '#',
    },
    {
      id: 'inv_003',
      date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Paid',
      download_url: '#',
    },
  ],
  usage: {
    monitors: 3,
    monitors_limit: 10,
    checks_this_month: 4320,
    checks_limit: 43200, // 10 monitors * 60 checks/hour * 24 hours * 30 days
  },
};

// Mock Analytics Data
export const mockAnalyticsData = {
  uptime_trends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    uptime: Math.random() * 5 + 95, // 95-100% uptime
  })),
  response_time_trends: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    avg_response_time: Math.random() * 500 + 200, // 200-700ms
    p95_response_time: Math.random() * 1000 + 500, // 500-1500ms
  })),
  error_rates: Array.from({ length: 7 }, (_, i) => ({
    day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    error_rate: Math.random() * 2, // 0-2% error rate
  })),
  top_errors: [
    { error: 'Connection timeout', count: 45, percentage: 35 },
    { error: 'HTTP 500', count: 28, percentage: 22 },
    { error: 'DNS resolution failed', count: 20, percentage: 16 },
    { error: 'SSL certificate error', count: 15, percentage: 12 },
    { error: 'HTTP 404', count: 12, percentage: 9 },
    { error: 'Other', count: 8, percentage: 6 },
  ],
};
