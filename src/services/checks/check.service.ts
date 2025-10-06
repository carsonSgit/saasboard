import { CheckRepository } from '@/repositories/check.repository'
import { IncidentService } from '@/services/incidents/incident.service'
import { checkWebsite } from '@/lib/monitoring'
import { Database } from '@/types/database'

type Check = Database['public']['Tables']['checks']['Row']

export interface CheckResult {
  isUp: boolean
  responseTime: number
  statusCode: number
  errorMessage: string | null
}

export class CheckService {
  private checkRepo: CheckRepository
  private incidentService: IncidentService

  constructor(useAdmin: boolean = false) {
    this.checkRepo = new CheckRepository(useAdmin)
    this.incidentService = new IncidentService(useAdmin)
  }

  /**
   * Perform a check on a monitor
   */
  async performCheck(monitorId: string, url: string): Promise<Check> {
    const result = await checkWebsite(url)
    
    // Store check result
    const check = await this.checkRepo.createCheck({
      monitor_id: monitorId,
      response_time: result.responseTime,
      status_code: result.statusCode,
      is_up: result.isUp,
      error_message: result.errorMessage || null
    })
    
    // Handle incident management
    if (!result.isUp) {
      await this.incidentService.createOrUpdateIncident(monitorId)
    } else {
      await this.incidentService.resolveIncidents(monitorId)
    }
    
    return check
  }

  /**
   * Get checks for a monitor
   */
  async getMonitorChecks(
    monitorId: string,
    limit: number = 100
  ): Promise<Check[]> {
    return await this.checkRepo.findByMonitorId(monitorId, limit)
  }

  /**
   * Get checks within a date range
   */
  async getChecksByDateRange(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<Check[]> {
    return await this.checkRepo.findByDateRange(
      monitorId,
      startDate,
      endDate
    )
  }

  /**
   * Get latest check for a monitor
   */
  async getLatestCheck(monitorId: string): Promise<Check | null> {
    return await this.checkRepo.findLatestByMonitorId(monitorId)
  }

  /**
   * Calculate uptime percentage
   */
  async getUptimePercentage(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return await this.checkRepo.getUptimePercentage(
      monitorId,
      startDate,
      endDate
    )
  }

  /**
   * Calculate average response time
   */
  async getAverageResponseTime(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return await this.checkRepo.getAverageResponseTime(
      monitorId,
      startDate,
      endDate
    )
  }
}

