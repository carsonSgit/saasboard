import { KPICards } from '@/components/dashboard/kpi-cards'
import { UptimeChart } from '@/components/dashboard/uptime-chart'
import { ResponseTimeChart } from '@/components/dashboard/response-time-chart'
import { RecentIncidents } from '@/components/dashboard/recent-incidents'
import { MonitorStatus } from '@/components/dashboard/monitor-status'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { SystemStatus } from '@/components/dashboard/system-status'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { BarChart3, AlertTriangle, Monitor, ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DesignTokens } from '@/lib/design-tokens'

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
      <div className={DesignTokens.spacing.page}>
        {/* Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your monitoring data"
          actions={
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          }
        />

        {/* Quick Stats Cards */}
        <div className={DesignTokens.spacing.statsGrid}>
          <StatCard
            icon={Monitor}
            iconColor="text-blue-500"
            label="Monitors"
            value={5}
            sublabel="Active monitors"
            actionLink={{
              href: '/dashboard/monitors',
              label: 'Manage monitors →'
            }}
          />
          
          <StatCard
            icon={AlertTriangle}
            iconColor="text-red-500"
            label="Incidents"
            value={2}
            sublabel="Active incidents"
            trend="Requires attention"
            trendColor="error"
            actionLink={{
              href: '/dashboard/incidents',
              label: 'View incidents →'
            }}
          />
          
          <StatCard
            icon={BarChart3}
            iconColor="text-green-500"
            label="Overall Uptime"
            value="99.9%"
            sublabel="Last 30 days"
            trend="+0.2% from last month"
            trendColor="success"
            actionLink={{
              href: '/dashboard/analytics',
              label: 'View analytics →'
            }}
          />
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
