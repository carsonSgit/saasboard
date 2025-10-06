import { MonitorRepository } from '@/repositories/monitor.repository'
import { CheckService } from '@/services/checks/check.service'
import { ProfileRepository } from '@/repositories/profile.repository'
import { 
  ValidationError, 
  NotFoundError, 
  AuthorizationError 
} from '@/lib/api/errors'
import { checkSubscriptionLimit } from '@/lib/subscriptions'
import { Database } from '@/types/database'

type Monitor = Database['public']['Tables']['monitors']['Row']
type MonitorInsert = Database['public']['Tables']['monitors']['Insert']
type MonitorUpdate = Database['public']['Tables']['monitors']['Update']

export interface CreateMonitorDto {
  name: string
  url: string
  check_interval?: number
  notification_email?: string
}

export interface UpdateMonitorDto {
  name?: string
  url?: string
  check_interval?: number
  notification_email?: string
  is_active?: boolean
}

export class MonitorService {
  private monitorRepo: MonitorRepository
  private checkService: CheckService
  private profileRepo: ProfileRepository

  constructor() {
    this.monitorRepo = new MonitorRepository()
    this.checkService = new CheckService()
    this.profileRepo = new ProfileRepository()
  }

  /**
   * Get all monitors for a user
   */
  async getUserMonitors(userId: string): Promise<Monitor[]> {
    return await this.monitorRepo.findByUserId(userId)
  }

  /**
   * Get monitor by ID (with ownership verification)
   */
  async getMonitorById(id: string, userId: string): Promise<Monitor> {
    const monitor = await this.monitorRepo.findById(id)
    
    if (!monitor) {
      throw new NotFoundError('Monitor')
    }
    
    if (monitor.user_id !== userId) {
      throw new AuthorizationError('Access denied to this monitor')
    }
    
    return monitor
  }

  /**
   * Create a new monitor
   */
  async createMonitor(
    userId: string,
    data: CreateMonitorDto
  ): Promise<Monitor> {
    // Validate URL format
    this.validateUrl(data.url)
    
    // Check subscription limits
    await this.checkMonitorLimit(userId)
    
    // Create monitor
    const monitor = await this.monitorRepo.createMonitor({
      user_id: userId,
      name: data.name,
      url: data.url,
      check_interval: data.check_interval || 300,
      notification_email: data.notification_email || null,
      is_active: true
    })
    
    // Schedule first check
    await this.checkService.performCheck(monitor.id, monitor.url)
    
    return monitor
  }

  /**
   * Update a monitor
   */
  async updateMonitor(
    id: string,
    userId: string,
    data: UpdateMonitorDto
  ): Promise<Monitor> {
    // Verify ownership
    await this.getMonitorById(id, userId)
    
    // Validate URL if provided
    if (data.url) {
      this.validateUrl(data.url)
    }
    
    return await this.monitorRepo.updateMonitor(id, data)
  }

  /**
   * Delete a monitor
   */
  async deleteMonitor(id: string, userId: string): Promise<void> {
    // Verify ownership
    await this.getMonitorById(id, userId)
    
    await this.monitorRepo.deleteMonitor(id)
  }

  /**
   * Toggle monitor active status
   */
  async toggleMonitor(
    id: string,
    userId: string,
    isActive: boolean
  ): Promise<Monitor> {
    // Verify ownership
    await this.getMonitorById(id, userId)
    
    return await this.monitorRepo.toggleActive(id, isActive)
  }

  /**
   * Get all active monitors (for cron job)
   */
  async getActiveMonitors(): Promise<Monitor[]> {
    return await this.monitorRepo.findActiveMonitors()
  }

  /**
   * Private helper: Validate URL format
   */
  private validateUrl(url: string): void {
    try {
      const urlObj = new URL(url)
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol')
      }
    } catch (error) {
      throw new ValidationError('Invalid URL format')
    }
  }

  /**
   * Private helper: Check if user can create more monitors
   */
  private async checkMonitorLimit(userId: string): Promise<void> {
    const existingCount = await this.monitorRepo.countByUserId(userId)
    const profile = await this.profileRepo.findById(userId)
    const tier = profile?.subscription_tier || 'free'
    
    if (!checkSubscriptionLimit(tier, 'monitors', existingCount)) {
      throw new ValidationError(
        'Monitor limit exceeded for your subscription tier'
      )
    }
  }
}

