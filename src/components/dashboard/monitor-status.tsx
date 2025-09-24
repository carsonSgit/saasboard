'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockMonitors, mockChecks } from '@/lib/mock-data'
import { Monitor, CheckCircle, XCircle, Clock } from 'lucide-react'

export function MonitorStatus() {
  const getLatestCheck = (monitorId: string) => {
    return mockChecks.find(check => check.monitor_id === monitorId)
  }

  const monitors = mockMonitors.slice(0, 5) // Show only first 5

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="h-5 w-5 text-blue-500" />
          <span>Monitor Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monitors.map((monitor) => {
            const latestCheck = getLatestCheck(monitor.id)
            const isUp = latestCheck?.is_up ?? false
            
            return (
              <div key={monitor.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {isUp ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {monitor.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {monitor.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={isUp ? 'default' : 'destructive'}>
                    {isUp ? 'Up' : 'Down'}
                  </Badge>
                  {latestCheck?.response_time && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{latestCheck.response_time}ms</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

