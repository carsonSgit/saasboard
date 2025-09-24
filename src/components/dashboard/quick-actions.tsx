'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MonitorForm } from '@/components/forms/monitor-form'
import { useToast } from '@/components/ui/toast-provider'
import { Plus, RefreshCw, Download, Settings } from 'lucide-react'

export function QuickActions() {
  const [isCreatingMonitor, setIsCreatingMonitor] = useState(false)
  const { addToast } = useToast()

  const handleQuickCheck = () => {
    addToast({
      title: 'Quick check initiated',
      description: 'Running immediate checks on all active monitors',
      variant: 'success'
    })
  }

  const handleExportData = () => {
    addToast({
      title: 'Export started',
      description: 'Your monitoring data is being prepared for download',
      variant: 'success'
    })
  }

  const handleMonitorCreated = () => {
    setIsCreatingMonitor(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => setIsCreatingMonitor(true)}
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm">Add Monitor</span>
            </Button>
            
            <Button 
              onClick={handleQuickCheck}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <RefreshCw className="h-6 w-6" />
              <span className="text-sm">Quick Check</span>
            </Button>
            
            <Button 
              onClick={handleExportData}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Export Data</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <MonitorForm
        isOpen={isCreatingMonitor}
        onClose={() => setIsCreatingMonitor(false)}
        onSuccess={handleMonitorCreated}
      />
    </>
  )
}
