import { Database } from '@/types/database'

type Monitor = Database['public']['Tables']['monitors']['Row']

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

export const mockApi = {
  getMonitors: async (): Promise<Monitor[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockMonitors
  },

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

  updateMonitor: async (id: string, data: Partial<Monitor>): Promise<Monitor> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const index = mockMonitors.findIndex(m => m.id === id)
    if (index !== -1) {
      mockMonitors[index] = { 
        ...mockMonitors[index], 
        ...data, 
        updated_at: new Date().toISOString() 
      }
      return mockMonitors[index]
    }
    throw new Error('Monitor not found')
  },

  deleteMonitor: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const index = mockMonitors.findIndex(m => m.id === id)
    if (index !== -1) {
      mockMonitors.splice(index, 1)
    }
  }
}

