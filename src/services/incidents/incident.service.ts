import { IncidentRepository } from '@/repositories/incident.repository'
import { NotFoundError } from '@/lib/api/errors'
import { Database } from '@/types/database'

type Incident = Database['public']['Tables']['incidents']['Row']

export class IncidentService {
  private incidentRepo: IncidentRepository

  constructor(useAdmin: boolean = false) {
    this.incidentRepo = new IncidentRepository(useAdmin)
  }

  /**
   * Get incidents for a monitor
   */
  async getMonitorIncidents(monitorId: string): Promise<Incident[]> {
    return await this.incidentRepo.findByMonitorId(monitorId)
  }

  /**
   * Get all active incidents
   */
  async getAllActiveIncidents(): Promise<Incident[]> {
    return await this.incidentRepo.findAllActive()
  }

  /**
   * Get active incident for a monitor
   */
  async getActiveIncident(monitorId: string): Promise<Incident | null> {
    return await this.incidentRepo.findActiveByMonitorId(monitorId)
  }

  /**
   * Create or update incident when monitor goes down
   */
  async createOrUpdateIncident(monitorId: string): Promise<Incident> {
    // Check if there's already an active incident
    const existingIncident = await this.incidentRepo.findActiveByMonitorId(
      monitorId
    )

    if (existingIncident) {
      // Already tracking this incident
      return existingIncident
    }

    // Create new incident
    return await this.incidentRepo.createIncident({
      monitor_id: monitorId,
      started_at: new Date().toISOString(),
      is_resolved: false
    })
  }

  /**
   * Resolve incidents when monitor comes back up
   */
  async resolveIncidents(monitorId: string): Promise<void> {
    await this.incidentRepo.resolveAllByMonitorId(monitorId)
  }

  /**
   * Manually resolve an incident
   */
  async resolveIncident(incidentId: string): Promise<Incident> {
    const incident = await this.incidentRepo.findById(incidentId)
    
    if (!incident) {
      throw new NotFoundError('Incident')
    }

    return await this.incidentRepo.resolveIncident(incidentId)
  }

  /**
   * Get incident statistics for a monitor
   */
  async getIncidentStats(monitorId: string): Promise<{
    total: number
    active: number
    resolved: number
  }> {
    const incidents = await this.incidentRepo.findByMonitorId(monitorId)
    const activeIncidents = incidents.filter(i => !i.is_resolved)

    return {
      total: incidents.length,
      active: activeIncidents.length,
      resolved: incidents.length - activeIncidents.length
    }
  }
}

