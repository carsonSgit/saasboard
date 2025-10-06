'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MonitorForm } from '@/components/forms/monitor-form'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageHeader } from '@/components/dashboard/page-header'
import { EmptyState } from '@/components/dashboard/empty-state'
import { mockMonitors, mockChecks, mockApi } from '@/lib/mocks'
import { useToast } from '@/components/ui/toast-provider'
import { Monitor, Plus } from 'lucide-react'
import { MonitorCard } from '@/components/monitors/monitor-card'
import { DesignTokens } from '@/lib/design-tokens'

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
      <div className={DesignTokens.spacing.page}>
        <PageHeader
          title="Monitors"
          subtitle="Manage your website monitoring configurations"
          actions={
            <Button 
              onClick={() => setIsCreating(true)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Monitor
            </Button>
          }
        />

      <div className="grid gap-4">
        {monitors.map((monitor) => {
          const latestCheck = getLatestCheck(monitor.id)
          return (
            <MonitorCard
              key={monitor.id}
              monitor={monitor}
              latestCheck={latestCheck}
              onToggle={handleToggleMonitor}
              onEdit={setEditingMonitor}
              onDelete={handleDeleteMonitor}
              isLoading={isLoading}
            />
          )
        })}
      </div>

      {monitors.length === 0 && (
        <EmptyState
          icon={Monitor}
          iconColor="text-blue-500"
          title="No monitors yet"
          description="Get started by adding your first website monitor to track uptime and performance"
          action={{
            label: 'Add Your First Monitor',
            onClick: () => setIsCreating(true),
            icon: Plus
          }}
        />
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
