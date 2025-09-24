'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { MonitorForm } from '@/components/forms/monitor-form'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockMonitors, mockChecks, mockApi } from '@/lib/mock-data'
import { useToast } from '@/components/ui/toast-provider'
import { Monitor, Plus, Edit, Trash2, Play, Pause, Activity, Clock, Globe } from 'lucide-react'
import Link from 'next/link'

export default function MonitorsPage() {
  const [monitors, setMonitors] = useState(mockMonitors)
  const [isCreating, setIsCreating] = useState(false)
  const [editingMonitor, setEditingMonitor] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional status changes
      if (Math.random() > 0.95) {
        setMonitors(prev => prev.map(monitor => {
          if (Math.random() > 0.5) {
            return { ...monitor, updated_at: new Date().toISOString() }
          }
          return monitor
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleToggleMonitor = async (id: string) => {
    const monitor = monitors.find(m => m.id === id)
    if (monitor) {
      setIsLoading(true)
      try {
        const updatedMonitor = await mockApi.updateMonitor(id, { is_active: !monitor.is_active })
        setMonitors(prev => prev.map(m => m.id === id ? updatedMonitor : m))
        addToast({
          title: monitor.is_active ? 'Monitor paused' : 'Monitor started',
          description: `${monitor.name} is now ${monitor.is_active ? 'paused' : 'active'}`,
          variant: 'success'
        })
      } catch (error) {
        addToast({
          title: 'Error',
          description: 'Failed to update monitor status',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteMonitor = async (id: string) => {
    const monitor = monitors.find(m => m.id === id)
    if (monitor && confirm(`Are you sure you want to delete "${monitor.name}"?`)) {
      setIsLoading(true)
      try {
        await mockApi.deleteMonitor(id)
        setMonitors(prev => prev.filter(m => m.id !== id))
        addToast({
          title: 'Monitor deleted',
          description: `${monitor.name} has been removed`,
          variant: 'success'
        })
      } catch (error) {
        addToast({
          title: 'Error',
          description: 'Failed to delete monitor',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleMonitorCreated = () => {
    // Refresh monitors list
    setMonitors([...mockMonitors])
  }

  const getLatestCheck = (monitorId: string) => {
    return mockChecks.find(check => check.monitor_id === monitorId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monitors</h1>
            <p className="text-gray-600 mt-1">
              Manage your website monitoring configurations
            </p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Monitor
          </Button>
        </div>

      <div className="grid gap-4">
        {monitors.map((monitor) => {
          const latestCheck = getLatestCheck(monitor.id)
          return (
            <Card key={monitor.id} className="hover:shadow-lg transition-shadow duration-200">
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
                      onClick={() => handleToggleMonitor(monitor.id)}
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
                      onClick={() => setEditingMonitor(monitor)}
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteMonitor(monitor.id)}
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
        })}
      </div>

      {monitors.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Monitor className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No monitors yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by adding your first website monitor
            </p>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Monitor
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Monitor Form Modal */}
      <MonitorForm
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSuccess={handleMonitorCreated}
      />

      <MonitorForm
        isOpen={!!editingMonitor}
        onClose={() => setEditingMonitor(null)}
        onSuccess={handleMonitorCreated}
        monitor={editingMonitor}
      />
      </div>
    </DashboardLayout>
  )
}
