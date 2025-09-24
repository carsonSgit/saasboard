'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockIncidents, mockMonitors } from '@/lib/mock-data'
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function RecentIncidents() {
  const incidents = mockIncidents.map(incident => {
    const monitor = mockMonitors.find(m => m.id === incident.monitor_id)
    return { ...incident, monitor }
  }).slice(0, 5) // Show only recent 5

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
              <p className="text-sm text-muted-foreground">No recent incidents</p>
            </div>
          ) : (
            incidents.map((incident) => (
              <div key={incident.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {incident.status === 'resolved' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {incident.monitor?.name || 'Unknown Monitor'}
                    </p>
                    <Badge variant={incident.status === 'resolved' ? 'default' : 'destructive'}>
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(incident.created_at).toLocaleString()}
                  </p>
                  {incident.error_message && (
                    <p className="text-xs text-red-600 mt-1 truncate">
                      {incident.error_message}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

