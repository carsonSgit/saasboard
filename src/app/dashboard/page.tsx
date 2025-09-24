import { KPICards } from '@/components/dashboard/kpi-cards'
import { UptimeChart } from '@/components/dashboard/uptime-chart'
import { ResponseTimeChart } from '@/components/dashboard/response-time-chart'
import { RecentIncidents } from '@/components/dashboard/recent-incidents'
import { MonitorStatus } from '@/components/dashboard/monitor-status'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { SystemStatus } from '@/components/dashboard/system-status'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Activity } from 'lucide-react'

export default function DashboardPage() {
  const rightSidebar = (
    <div className="space-y-6">
      <RecentIncidents />
      <MonitorStatus />
      <QuickActions />
      <SystemStatus />
    </div>
  )

  return (
    <DashboardLayout rightSidebar={rightSidebar}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">
              Here's your monitoring dashboard overview
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Monitor
          </Button>
        </div>

        {/* Overview Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
              Overview
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">
              Performance
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">
              Incidents
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">
              Analytics
            </button>
          </div>
          <Select defaultValue="24h">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <KPICards />

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <UptimeChart />
          <ResponseTimeChart />
        </div>
      </div>
    </DashboardLayout>
  )
}
