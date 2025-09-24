'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Server, Database, Globe } from 'lucide-react'

export function SystemStatus() {
  const systemComponents = [
    { name: 'API Server', status: 'operational', icon: Server },
    { name: 'Database', status: 'operational', icon: Database },
    { name: 'Monitoring Nodes', status: 'operational', icon: Activity },
    { name: 'Global CDN', status: 'operational', icon: Globe },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-500" />
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
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {component.status}
                </Badge>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

