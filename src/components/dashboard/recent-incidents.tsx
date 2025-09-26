'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockIncidents, mockMonitors } from '@/lib/mock-data'
import { CheckCircle } from 'lucide-react'

export function RecentIncidents() {
  const incidents = mockIncidents.map(incident => {
    const monitor = mockMonitors.find(m => m.id === incident.monitor_id)
    return { ...incident, monitor }
  }).slice(0, 5) // Show only recent 5

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Incidents</span>
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {incident.monitor?.name || 'Unknown Monitor'}
                    </p>
                    
                  <p className="text-xs text-muted-foreground">
                    {new Date(incident.started_at).toLocaleString()}
                  </p>
                  </div>
                  <div className={`w-2 h-2 ${incident.is_resolved ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
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

