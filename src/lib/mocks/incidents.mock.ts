import { Database } from '@/types/database'

type Incident = Database['public']['Tables']['incidents']['Row']

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

export const mockApi = {
  getIncidents: async (): Promise<Incident[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockIncidents
  }
}

