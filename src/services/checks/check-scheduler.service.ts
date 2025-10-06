import { MonitorRepository } from '@/repositories/monitor.repository'
import { CheckService } from './check.service'

export interface CheckSchedulerResult {
  checked: number
  successful: number
  failed: number
  errors: Array<{ monitorId: string; error: string }>
}

/**
 * Service for scheduling and running monitoring checks
 * Used by cron jobs
 */
export class CheckSchedulerService {
  private monitorRepo: MonitorRepository
  private checkService: CheckService

  constructor() {
    this.monitorRepo = new MonitorRepository()
    this.checkService = new CheckService(true) // Use admin client
  }

  /**
   * Run checks for all active monitors
   */
  async runChecks(): Promise<CheckSchedulerResult> {
    const monitors = await this.monitorRepo.findActiveMonitors()
    
    const result: CheckSchedulerResult = {
      checked: monitors.length,
      successful: 0,
      failed: 0,
      errors: []
    }

    // Process checks in parallel with controlled concurrency
    const checkPromises = monitors.map(monitor =>
      this.performMonitorCheck(monitor.id, monitor.url, result)
    )

    await Promise.allSettled(checkPromises)

    return result
  }

  /**
   * Run check for a specific monitor
   */
  async runCheckForMonitor(monitorId: string, url: string): Promise<void> {
    await this.checkService.performCheck(monitorId, url)
  }

  /**
   * Private helper: Perform a check and update results
   */
  private async performMonitorCheck(
    monitorId: string,
    url: string,
    result: CheckSchedulerResult
  ): Promise<void> {
    try {
      await this.checkService.performCheck(monitorId, url)
      result.successful++
    } catch (error) {
      result.failed++
      result.errors.push({
        monitorId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      console.error(`Error checking monitor ${monitorId}:`, error)
    }
  }
}

