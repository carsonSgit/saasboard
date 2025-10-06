'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { EmptyState } from '@/components/dashboard/empty-state'
import { mockIncidents, mockMonitors } from '@/lib/mocks'
import { useToast } from '@/components/ui/toast-provider'
import { AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react'
import { IncidentCard } from '@/components/incidents/incident-card'
import { IncidentFilters } from '@/components/incidents/incident-filters'
import { DesignTokens } from '@/lib/design-tokens'

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState(mockIncidents)
  const [filteredIncidents, setFilteredIncidents] = useState(incidents)
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToast } = useToast()

  useEffect(() => {
    let filtered = incidents

    // Filter by status
    if (filter === 'active') {
      filtered = filtered.filter(incident => !incident.is_resolved)
    } else if (filter === 'resolved') {
      filtered = filtered.filter(incident => incident.is_resolved)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(incident => {
        const monitor = mockMonitors.find(m => m.id === incident.monitor_id)
        return monitor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               monitor?.url.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    setFilteredIncidents(filtered)
  }, [incidents, filter, searchTerm])

  const getMonitorName = (monitorId: string) => {
    const monitor = mockMonitors.find(m => m.id === monitorId)
    return monitor?.name || 'Unknown Monitor'
  }

  const getMonitorUrl = (monitorId: string) => {
    const monitor = mockMonitors.find(m => m.id === monitorId)
    return monitor?.url || ''
  }

  const activeIncidents = incidents.filter(i => !i.is_resolved).length
  const resolvedIncidents = incidents.filter(i => i.is_resolved).length

  return (
    <DashboardLayout>
      <div className={DesignTokens.spacing.page}>
        {/* Header */}
        <PageHeader
          title="Incidents"
          subtitle="Track and manage service incidents and outages"
          actions={
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className={DesignTokens.spacing.statsGrid}>
          <StatCard
            icon={AlertTriangle}
            iconColor="text-red-500"
            label="Active Incidents"
            value={activeIncidents}
            sublabel="Currently affecting services"
          />
          
          <StatCard
            icon={CheckCircle}
            iconColor="text-green-500"
            label="Resolved This Month"
            value={resolvedIncidents}
            sublabel="Successfully resolved"
          />
          
          <StatCard
            icon={Clock}
            iconColor="text-blue-500"
            label="Avg Resolution Time"
            value="2h 15m"
            sublabel="Mean time to resolution"
          />
        </div>

        {/* Filters and Search */}
        <IncidentFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <EmptyState
              icon={AlertTriangle}
              iconColor="text-gray-400"
              title="No incidents found"
              description={
                filter === 'all' 
                  ? "No incidents have been recorded yet. Your monitors are running smoothly!"
                  : `No ${filter} incidents found. Try adjusting your filters.`
              }
            />
          ) : (
            filteredIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                monitorName={getMonitorName(incident.monitor_id)}
                monitorUrl={getMonitorUrl(incident.monitor_id)}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
