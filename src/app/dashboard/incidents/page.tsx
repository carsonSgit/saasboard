'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockIncidents, mockMonitors, mockApi } from '@/lib/mock-data'
import { useToast } from '@/components/ui/toast-provider'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Search,
  Calendar,
  Monitor,
  ExternalLink
} from 'lucide-react'

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

  const getDuration = (startedAt: string, resolvedAt?: string | null) => {
    const start = new Date(startedAt)
    const end = resolvedAt ? new Date(resolvedAt) : new Date()
    const diffMs = end.getTime() - start.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`
    return `${diffMins}m`
  }

  const activeIncidents = incidents.filter(i => !i.is_resolved).length
  const resolvedIncidents = incidents.filter(i => i.is_resolved).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
            <p className="text-gray-600 mt-1">
              Track and manage service incidents and outages
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activeIncidents}</div>
              <p className="text-xs text-muted-foreground">
                Currently affecting services
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{resolvedIncidents}</div>
              <p className="text-xs text-muted-foreground">
                Successfully resolved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 15m</div>
              <p className="text-xs text-muted-foreground">
                Mean time to resolution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search incidents by monitor name or URL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <div className="flex space-x-1">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filter === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('resolved')}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No incidents found</h3>
                <p className="text-gray-600 text-center">
                  {filter === 'all' 
                    ? "No incidents have been recorded yet."
                    : `No ${filter} incidents found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:outline-1 hover:outline-gray-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        incident.is_resolved ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {incident.is_resolved ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {getMonitorName(incident.monitor_id)}
                          </h3>
                          <Badge variant={incident.is_resolved ? 'default' : 'destructive'}>
                            {incident.is_resolved ? 'Resolved' : 'Active'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Monitor className="h-4 w-4" />
                          <span>{getMonitorUrl(incident.monitor_id)}</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Started:</span>
                            <p className="text-gray-600">
                              {new Date(incident.started_at).toLocaleString()}
                            </p>
                          </div>
                          {incident.resolved_at && (
                            <div>
                              <span className="font-medium text-gray-700">Resolved:</span>
                              <p className="text-gray-600">
                                {new Date(incident.resolved_at).toLocaleString()}
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Duration:</span>
                            <p className="text-gray-600">
                              {getDuration(incident.started_at, incident.resolved_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {!incident.is_resolved && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
