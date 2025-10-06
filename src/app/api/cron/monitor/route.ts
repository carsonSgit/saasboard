import { NextRequest } from 'next/server'
import { CheckSchedulerService } from '@/services/checks/check-scheduler.service'
import { verifyCronSecret } from '@/lib/api/auth'
import { apiResponse, apiError } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    verifyCronSecret(request)
    
    const scheduler = new CheckSchedulerService()
    const result = await scheduler.runChecks()
    
    return apiResponse({
      success: true,
      checked: result.checked,
      successful: result.successful,
      failed: result.failed,
      errors: result.errors
    })
  } catch (error) {
    return apiError(error)
  }
}
