import { NextRequest } from 'next/server'
import { MonitorService } from '@/services/monitors/monitor.service'
import { getUserFromRequest } from '@/lib/api/auth'
import { apiResponse, apiError } from '@/lib/api/response'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserFromRequest(request)
    const service = new MonitorService()
    const monitor = await service.getMonitorById(params.id, userId)
    
    return apiResponse({ monitor })
  } catch (error) {
    return apiError(error)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserFromRequest(request)
    const body = await request.json()
    
    const service = new MonitorService()
    const monitor = await service.updateMonitor(params.id, userId, {
      name: body.name,
      url: body.url,
      check_interval: body.checkInterval,
      notification_email: body.notificationEmail,
      is_active: body.isActive
    })
    
    return apiResponse({ monitor })
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserFromRequest(request)
    const service = new MonitorService()
    await service.deleteMonitor(params.id, userId)
    
    return apiResponse({ success: true })
  } catch (error) {
    return apiError(error)
  }
}

