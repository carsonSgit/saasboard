import { NextRequest } from 'next/server'
import { IncidentService } from '@/services/incidents/incident.service'
import { getUserFromRequest } from '@/lib/api/auth'
import { apiResponse, apiError } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    const service = new IncidentService()
    const incidents = await service.getAllActiveIncidents()
    
    return apiResponse({ incidents })
  } catch (error) {
    return apiError(error)
  }
}

