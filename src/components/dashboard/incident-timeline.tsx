'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockIncidents, mockMonitors } from '@/lib/mocks'
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function IncidentTimeline() {
  const incidents = mockIncidents.map(incident => {
    const monitor = mockMonitors.find(m => m.id === incident.monitor_id)
    return { ...incident, monitor }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <span>Recent Incidents</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No incidents in the last 30 days</p>
            </div>
          ) : (
            incidents.map((incident) => (
              <div key={incident.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  incident.is_resolved ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {incident.is_resolved ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{incident.monitor?.name || 'Unknown Monitor'}</h4>
                    <Badge variant={incident.is_resolved ? 'default' : 'destructive'}>
                      {incident.is_resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Started: {new Date(incident.started_at).toLocaleString()}
                  </p>
                  {incident.resolved_at && (
                    <p className="text-sm text-muted-foreground">
                      Resolved: {new Date(incident.resolved_at).toLocaleString()}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Duration: {incident.resolved_at 
                        ? Math.round((new Date(incident.resolved_at).getTime() - new Date(incident.started_at).getTime()) / 60000)
                        : 'Ongoing'
                      } minutes
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
