"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Monitor, Globe, Clock, Activity, Play, Pause, Edit, Trash2 } from 'lucide-react'

interface MonitorType {
  id: string
  name: string
  url: string
  check_interval: number
  is_active: boolean
  notification_email?: string | null
  created_at: string
  updated_at: string
}

interface CheckType {
  is_up: boolean
  response_time: number
  checked_at: string
}

interface MonitorCardProps {
  monitor: MonitorType
  latestCheck: CheckType | undefined
  onToggle: (id: string) => void
  onEdit: (monitor: MonitorType) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export function MonitorCard({ 
  monitor, 
  latestCheck, 
  onToggle, 
  onEdit, 
  onDelete, 
  isLoading 
}: MonitorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{monitor.name}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span>{monitor.url}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge 
              isUp={latestCheck?.is_up ?? false} 
              responseTime={latestCheck?.response_time || undefined} 
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggle(monitor.id)}
              disabled={isLoading}
              className="hover:bg-gray-100 transition-colors"
            >
              {monitor.is_active ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(monitor)}
              className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(monitor.id)}
              disabled={isLoading}
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Check Interval</p>
              <p className="text-muted-foreground">{monitor.check_interval}s</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Status</p>
              <p className={`font-medium ${monitor.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                {monitor.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
          <div>
            <p className="font-medium">Last Check</p>
            <p className="text-muted-foreground">
              {latestCheck ? new Date(latestCheck.checked_at).toLocaleTimeString() : 'Never'}
            </p>
          </div>
          <div>
            <p className="font-medium">Response Time</p>
            <p className={`font-medium ${
              latestCheck?.response_time 
                ? latestCheck.response_time < 1000 
                  ? 'text-green-600' 
                  : latestCheck.response_time < 3000 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                : 'text-muted-foreground'
            }`}>
              {latestCheck?.response_time ? `${latestCheck.response_time}ms` : 'N/A'}
            </p>
          </div>
        </div>
        {monitor.notification_email && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              📧 Alerts sent to: {monitor.notification_email}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

