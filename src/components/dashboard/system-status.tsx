'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Server, Database, Globe } from 'lucide-react'

export function SystemStatus() {
  const systemComponents = [
    { name: 'API Server', status: 'up', icon: Server },
    { name: 'Database', status: 'down', icon: Database },
    { name: 'Monitoring Nodes', status: 'up', icon: Activity },
    { name: 'Global CDN', status: 'up', icon: Globe },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>System Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemComponents.map((component) => {
            const Icon = component.icon
            return (
              <div key={component.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {component.name}
                  </span>
                </div>
                
                {/* replicate the ALl systems operational circle instead of badges with text */}
                <div className={`w-2 h-2 ${component.status === 'up' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

