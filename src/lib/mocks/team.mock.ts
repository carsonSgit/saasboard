export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: string
  last_active: string | null
  avatar: string | null
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'user_001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'active',
    last_active: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    avatar: null,
  },
  {
    id: 'user_002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'active',
    last_active: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
]

