import { Database } from '@/types/database'
import { BaseRepository } from './base.repository'

type Monitor = Database['public']['Tables']['monitors']['Row']
type MonitorInsert = Database['public']['Tables']['monitors']['Insert']
type MonitorUpdate = Database['public']['Tables']['monitors']['Update']

export class MonitorRepository extends BaseRepository<Monitor> {
  constructor() {
    super('monitors')
  }

  /**
   * Find all monitors for a user
   */
  async findByUserId(userId: string): Promise<Monitor[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    this.handleError(error)
    return data || []
  }

  /**
   * Find active monitors
   */
  async findActiveMonitors(): Promise<Monitor[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)

    this.handleError(error)
    return data || []
  }

  /**
   * Count monitors by user ID
   */
  async countByUserId(userId: string): Promise<number> {
    return await this.count('user_id', userId)
  }

  /**
   * Create a monitor
   */
  async createMonitor(monitor: MonitorInsert): Promise<Monitor> {
    return await this.create(monitor)
  }

  /**
   * Update a monitor
   */
  async updateMonitor(id: string, monitor: MonitorUpdate): Promise<Monitor> {
    return await this.update(id, monitor)
  }

  /**
   * Toggle monitor active status
   */
  async toggleActive(id: string, isActive: boolean): Promise<Monitor> {
    return await this.update(id, { is_active: isActive })
  }

  /**
   * Delete a monitor
   */
  async deleteMonitor(id: string): Promise<void> {
    await this.delete(id)
  }
}

