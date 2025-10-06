import { Database } from '@/types/database'
import { BaseRepository } from './base.repository'

type Incident = Database['public']['Tables']['incidents']['Row']
type IncidentInsert = Database['public']['Tables']['incidents']['Insert']
type IncidentUpdate = Database['public']['Tables']['incidents']['Update']

export class IncidentRepository extends BaseRepository<Incident> {
  constructor(useAdmin: boolean = false) {
    super('incidents', useAdmin)
  }

  /**
   * Find incidents for a monitor
   */
  async findByMonitorId(monitorId: string): Promise<Incident[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('monitor_id', monitorId)
      .order('started_at', { ascending: false })

    this.handleError(error)
    return data || []
  }

  /**
   * Find active incident for a monitor
   */
  async findActiveByMonitorId(monitorId: string): Promise<Incident | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('monitor_id', monitorId)
      .eq('is_resolved', false)
      .single()

    if (error?.code === 'PGRST116') {
      return null
    }

    this.handleError(error)
    return data
  }

  /**
   * Find all active incidents
   */
  async findAllActive(): Promise<Incident[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('is_resolved', false)
      .order('started_at', { ascending: false })

    this.handleError(error)
    return data || []
  }

  /**
   * Create an incident
   */
  async createIncident(incident: IncidentInsert): Promise<Incident> {
    return await this.create(incident)
  }

  /**
   * Resolve an incident
   */
  async resolveIncident(id: string): Promise<Incident> {
    return await this.update(id, {
      is_resolved: true,
      resolved_at: new Date().toISOString()
    })
  }

  /**
   * Resolve all active incidents for a monitor
   */
  async resolveAllByMonitorId(monitorId: string): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .update({
        is_resolved: true,
        resolved_at: new Date().toISOString()
      })
      .eq('monitor_id', monitorId)
      .eq('is_resolved', false)

    this.handleError(error)
  }

  /**
   * Get incident count by monitor
   */
  async countByMonitorId(monitorId: string): Promise<number> {
    return await this.count('monitor_id', monitorId)
  }
}

