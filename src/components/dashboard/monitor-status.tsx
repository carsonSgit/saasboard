'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockMonitors, mockChecks } from '@/lib/mocks'
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
          <span>Monitors</span>
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
                <div className={`w-2 h-2 ${isUp ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

