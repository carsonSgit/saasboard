"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Monitor, ExternalLink } from 'lucide-react'
import { getDuration } from '@/lib/date-utils'

interface Incident {
  id: string
  monitor_id: string
  started_at: string
  resolved_at: string | null
  is_resolved: boolean
}

interface IncidentCardProps {
  incident: Incident
  monitorName: string
  monitorUrl: string
}

export function IncidentCard({ incident, monitorName, monitorUrl }: IncidentCardProps) {
  return (
    <Card className="hover:outline-1 hover:outline-gray-300">
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
                <h3 className="text-lg font-semibold">{monitorName}</h3>
                <Badge variant={incident.is_resolved ? 'default' : 'destructive'}>
                  {incident.is_resolved ? 'Resolved' : 'Active'}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Monitor className="h-4 w-4" />
                <span>{monitorUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Started:</span>
                  <p className="text-gray-600">
                    {new Date(incident.started_at).toLocaleString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit',
                      hour12: false 
                    })}
                  </p>
                </div>
                {incident.resolved_at && (
                  <div>
                    <span className="font-medium text-gray-700">Resolved:</span>
                    <p className="text-gray-600">
                      {new Date(incident.resolved_at).toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit',
                        hour12: false 
                      })}
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
  )
}

