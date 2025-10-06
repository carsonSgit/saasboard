/**
 * Centralized mock data exports
 */

// Profiles
export { mockProfile } from './profiles.mock'
export type { Profile } from './profiles.mock'

// Monitors
export { mockMonitors, mockApi as monitorMockApi } from './monitors.mock'

// Checks
export { mockChecks, mockApi as checkMockApi } from './checks.mock'

// Incidents
export { mockIncidents, mockApi as incidentMockApi } from './incidents.mock'

// Team
export { mockTeamMembers } from './team.mock'
export type { TeamMember } from './team.mock'

// Billing
export { mockBillingData } from './billing.mock'
export type { Invoice, BillingUsage, BillingData } from './billing.mock'

// Analytics
export { mockAnalyticsData } from './analytics.mock'
export type { 
  UptimeTrend, 
  ResponseTimeTrend, 
  ErrorRate, 
  TopError, 
  AnalyticsData 
} from './analytics.mock'

// Legacy compatibility - combined mock API
export const mockApi = {
  // Monitors
  getMonitors: async () => {
    const { mockApi } = await import('./monitors.mock')
    return mockApi.getMonitors()
  },
  createMonitor: async (data: any) => {
    const { mockApi } = await import('./monitors.mock')
    return mockApi.createMonitor(data)
  },
  updateMonitor: async (id: string, data: any) => {
    const { mockApi } = await import('./monitors.mock')
    return mockApi.updateMonitor(id, data)
  },
  deleteMonitor: async (id: string) => {
    const { mockApi } = await import('./monitors.mock')
    return mockApi.deleteMonitor(id)
  },

  // Checks
  getChecks: async (monitorId: string) => {
    const { mockApi } = await import('./checks.mock')
    return mockApi.getChecks(monitorId)
  },
  getAllChecks: async () => {
    const { mockApi } = await import('./checks.mock')
    return mockApi.getAllChecks()
  },

  // Incidents
  getIncidents: async () => {
    const { mockApi } = await import('./incidents.mock')
    return mockApi.getIncidents()
  },

  // Profile
  getProfile: async () => {
    const { mockApi } = await import('./profiles.mock')
    return mockApi.getProfile()
  }
}

