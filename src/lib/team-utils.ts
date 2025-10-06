import { Crown, Shield, Eye, Users } from 'lucide-react'

/**
 * Team utility functions for role icons, status badges, and time formatting
 */

/**
 * Gets the appropriate icon component for a team member role
 * @param role - The role of the team member
 * @returns Icon component configuration
 */
export const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Owner':
      return { Icon: Crown, className: 'h-4 w-4 text-yellow-500' }
    case 'Admin':
      return { Icon: Shield, className: 'h-4 w-4 text-blue-500' }
    case 'Viewer':
      return { Icon: Eye, className: 'h-4 w-4 text-gray-500' }
    default:
      return { Icon: Users, className: 'h-4 w-4 text-gray-500' }
  }
}

/**
 * Gets badge configuration for team member status
 * @param status - The status of the team member
 * @returns Badge styling configuration
 */
export const getStatusBadgeConfig = (status: string) => {
  switch (status) {
    case 'active':
      return { variant: 'default' as const, className: 'bg-green-100 text-green-700', label: 'Active' }
    case 'pending':
      return { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-700', label: 'Pending' }
    case 'inactive':
      return { variant: 'destructive' as const, className: '', label: 'Inactive' }
    default:
      return { variant: 'outline' as const, className: '', label: status }
  }
}

/**
 * Formats the last active timestamp into human-readable text
 * @param lastActive - ISO timestamp string or null
 * @returns Formatted string like "5m ago", "2h ago", "3d ago"
 */
export const getLastActiveText = (lastActive: string | null): string => {
  if (!lastActive) return 'Never'
  
  const now = new Date()
  const lastActiveDate = new Date(lastActive)
  const diffMs = now.getTime() - lastActiveDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return lastActiveDate.toLocaleDateString()
}

/**
 * Filters team members by search term (name, email, or role)
 * @param members - Array of team members
 * @param searchTerm - Search string
 * @returns Filtered array of team members
 */
export const filterTeamMembers = <T extends { name: string; email: string; role: string }>(
  members: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm) return members
  
  const lowerSearch = searchTerm.toLowerCase()
  return members.filter(
    m =>
      m.name.toLowerCase().includes(lowerSearch) ||
      m.email.toLowerCase().includes(lowerSearch) ||
      m.role.toLowerCase().includes(lowerSearch)
  )
}

