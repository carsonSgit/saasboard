import { NextRequest } from 'next/server'
import { MonitorService } from '@/services/monitors/monitor.service'
import { getUserFromRequest } from '@/lib/api/auth'
import { apiResponse, apiError } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    const service = new MonitorService()
    const monitors = await service.getUserMonitors(userId)
    return apiResponse({ monitors })
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    const body = await request.json()
    
    const service = new MonitorService()
    const monitor = await service.createMonitor(userId, {
      name: body.name,
      url: body.url,
      check_interval: body.checkInterval,
      notification_email: body.notificationEmail
    })
    
    return apiResponse({ monitor }, 201)
  } catch (error) {
    return apiError(error)
  }
}
