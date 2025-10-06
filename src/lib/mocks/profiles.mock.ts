import { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export const mockProfile: Profile = {
  id: 'mock-user-id',
  email: 'demo@saasboard.com',
  full_name: 'Demo User',
  subscription_tier: 'pro',
  stripe_customer_id: 'cus_mock',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
}

export const mockApi = {
  getProfile: async (): Promise<Profile> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProfile
  }
}

