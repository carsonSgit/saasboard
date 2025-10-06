'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast-provider'
import { mockApi } from '@/lib/mocks'

interface MonitorFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  monitor?: any
}

export function MonitorForm({ isOpen, onClose, onSuccess, monitor }: MonitorFormProps) {
  const [formData, setFormData] = useState({
    name: monitor?.name || '',
    url: monitor?.url || '',
    checkInterval: monitor?.check_interval || 300,
    notificationEmail: monitor?.notification_email || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (monitor) {
        await mockApi.updateMonitor(monitor.id, formData)
        addToast({
          title: 'Monitor updated successfully',
          description: `${formData.name} has been updated`,
          variant: 'success'
        })
      } else {
        await mockApi.createMonitor(formData)
        addToast({
          title: 'Monitor created successfully',
          description: `${formData.name} is now being monitored`,
          variant: 'success'
        })
      }
      
      onSuccess()
      onClose()
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to save monitor. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{monitor ? 'Edit Monitor' : 'Add New Monitor'}</DialogTitle>
          <DialogDescription>
            {monitor ? 'Update your monitor settings' : 'Add a new website to monitor'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Monitor Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="My Website"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkInterval">Check Interval (seconds)</Label>
            <Input
              id="checkInterval"
              type="number"
              value={formData.checkInterval}
              onChange={(e) => handleInputChange('checkInterval', parseInt(e.target.value))}
              min="30"
              max="3600"
              required
            />
            <p className="text-xs text-muted-foreground">
              How often to check the website (30-3600 seconds)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notificationEmail">Notification Email (optional)</Label>
            <Input
              id="notificationEmail"
              type="email"
              value={formData.notificationEmail}
              onChange={(e) => handleInputChange('notificationEmail', e.target.value)}
              placeholder="alerts@example.com"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (monitor ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
