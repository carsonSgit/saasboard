import { NextRequest } from 'next/server'
import { CheckService } from '@/services/checks/check.service'
import { MonitorService } from '@/services/monitors/monitor.service'
import { getUserFromRequest, getPaginationParams } from '@/lib/api/auth'
import { apiResponse, apiError } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    const { searchParams } = new URL(request.url)
    
    // Get date range from query params or default to last 7 days
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const monitorService = new MonitorService()
    const checkService = new CheckService()
    
    // Get user monitors
    const monitors = await monitorService.getUserMonitors(userId)
    
    // Calculate stats for each monitor
    const monitorStats = await Promise.all(
      monitors.map(async (monitor) => {
        const uptime = await checkService.getUptimePercentage(
          monitor.id,
          startDate.toISOString(),
          endDate.toISOString()
        )
        
        const avgResponseTime = await checkService.getAverageResponseTime(
          monitor.id,
          startDate.toISOString(),
          endDate.toISOString()
        )
        
        return {
          monitorId: monitor.id,
          monitorName: monitor.name,
          uptime,
          avgResponseTime
        }
      })
    )
    
    // Calculate overall stats
    const overallUptime = monitorStats.length > 0
      ? monitorStats.reduce((sum, stat) => sum + stat.uptime, 0) / monitorStats.length
      : 100
    
    const overallResponseTime = monitorStats.length > 0
      ? monitorStats.reduce((sum, stat) => sum + stat.avgResponseTime, 0) / monitorStats.length
      : 0
    
    return apiResponse({
      summary: {
        overallUptime,
        overallResponseTime,
        totalMonitors: monitors.length,
        activeMonitors: monitors.filter(m => m.is_active).length
      },
      monitorStats
    })
  } catch (error) {
    return apiError(error)
  }
}

