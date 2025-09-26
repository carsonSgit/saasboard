import { KPICards } from '@/components/dashboard/kpi-cards'
import { UptimeChart } from '@/components/dashboard/uptime-chart'
import { ResponseTimeChart } from '@/components/dashboard/response-time-chart'
import { RecentIncidents } from '@/components/dashboard/recent-incidents'
import { MonitorStatus } from '@/components/dashboard/monitor-status'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { SystemStatus } from '@/components/dashboard/system-status'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, AlertTriangle, Monitor, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const rightSidebar = (
    <div className="space-y-6">
      <QuickActions />
      <RecentIncidents />
      <MonitorStatus />
      <SystemStatus />
    </div>
  )

  return (
    <DashboardLayout rightSidebar={rightSidebar}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Overview of your monitoring data
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
            <Card className="transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitors</CardTitle>
                <Monitor className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Active monitors
                </p>
                  <Link href="/dashboard/monitors">
                  <div className="flex items-center text-xs text-blue-600 mt-2 hover:text-blue-500">
                    <span>Manage monitors</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">
                  Active incidents
                </p>
                <Link href="/dashboard/incidents">
                <div className="flex items-center text-xs text-blue-600 mt-2 hover:text-blue-500">
                    <span>View incidents</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  Overall uptime
                </p>
                <Link href="/dashboard/analytics">
                <div className="flex items-center text-xs text-blue-600 mt-2 hover:text-blue-500">
                    <span>View analytics</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                </div>
                </Link>
              </CardContent>
            </Card>
        </div>
        {/* KPI Cards */}
        <KPICards />

        {/* Quick Navigation */}
        

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <UptimeChart />
          <ResponseTimeChart />
        </div>
      </div>
    </DashboardLayout>
  )
}
