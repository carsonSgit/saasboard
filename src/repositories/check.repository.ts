import { Database } from '@/types/database'
import { BaseRepository } from './base.repository'

type Check = Database['public']['Tables']['checks']['Row']
type CheckInsert = Database['public']['Tables']['checks']['Insert']

export class CheckRepository extends BaseRepository<Check> {
  constructor(useAdmin: boolean = false) {
    super('checks', useAdmin)
  }

  /**
   * Find checks for a monitor
   */
  async findByMonitorId(
    monitorId: string,
    limit: number = 100
  ): Promise<Check[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('monitor_id', monitorId)
      .order('checked_at', { ascending: false })
      .limit(limit)

    this.handleError(error)
    return data || []
  }

  /**
   * Find checks within a date range
   */
  async findByDateRange(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<Check[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('monitor_id', monitorId)
      .gte('checked_at', startDate)
      .lte('checked_at', endDate)
      .order('checked_at', { ascending: false })

    this.handleError(error)
    return data || []
  }

  /**
   * Find latest check for a monitor
   */
  async findLatestByMonitorId(monitorId: string): Promise<Check | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('monitor_id', monitorId)
      .order('checked_at', { ascending: false })
      .limit(1)
      .single()

    if (error?.code === 'PGRST116') {
      return null
    }

    this.handleError(error)
    return data
  }

  /**
   * Create a check record
   */
  async createCheck(check: CheckInsert): Promise<Check> {
    return await this.create(check)
  }

  /**
   * Get uptime percentage for a monitor
   */
  async getUptimePercentage(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    const checks = await this.findByDateRange(monitorId, startDate, endDate)
    
    if (checks.length === 0) {
      return 100
    }

    const upChecks = checks.filter(check => check.is_up).length
    return (upChecks / checks.length) * 100
  }

  /**
   * Get average response time for a monitor
   */
  async getAverageResponseTime(
    monitorId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    const checks = await this.findByDateRange(monitorId, startDate, endDate)
    
    if (checks.length === 0) {
      return 0
    }

    const totalResponseTime = checks.reduce(
      (sum, check) => sum + (check.response_time || 0),
      0
    )
    return totalResponseTime / checks.length
  }
}

