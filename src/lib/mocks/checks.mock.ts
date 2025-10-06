import { Database } from '@/types/database'
import { mockMonitors } from './monitors.mock'

type Check = Database['public']['Tables']['checks']['Row']

function generateMockChecks(): Check[] {
  const checks: Check[] = []
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  mockMonitors.forEach(monitor => {
    const checkInterval = monitor.check_interval * 1000
    let currentTime = sevenDaysAgo.getTime()
    
    while (currentTime < now.getTime()) {
      const isUp = Math.random() > 0.05 // 95% uptime
      const responseTime = isUp ? 
        Math.floor(Math.random() * 2000) + 100 : 
        Math.floor(Math.random() * 5000) + 1000
      
      const statusCode = isUp ? 
        (Math.random() > 0.1 ? 200 : (Math.random() > 0.5 ? 301 : 404)) : 
        0
      
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
  
  return checks.sort((a, b) => 
    new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime()
  )
}

export const mockChecks: Check[] = generateMockChecks()

export const mockApi = {
  getChecks: async (monitorId: string): Promise<Check[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockChecks.filter(check => check.monitor_id === monitorId)
  },

  getAllChecks: async (): Promise<Check[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockChecks
  }
}

