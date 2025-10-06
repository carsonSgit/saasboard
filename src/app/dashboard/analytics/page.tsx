'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { mockAnalyticsData } from '@/lib/mocks'
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Download,
  Activity
} from 'lucide-react'
import { AnalyticsSummary } from '@/components/analytics/analytics-summary'
import { UptimeTrendChart } from '@/components/analytics/uptime-trend-chart'
import { ResponseTimeBarChart } from '@/components/analytics/response-time-bar-chart'
import { ErrorRateAreaChart } from '@/components/analytics/error-rate-area-chart'
import { TopErrorsDonutChart } from '@/components/analytics/top-errors-donut-chart'
import { DesignTokens } from '@/lib/design-tokens'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const { uptime_trends, response_time_trends, error_rates, top_errors } = mockAnalyticsData

  // Calculate summary metrics
  const avgUptime = uptime_trends.reduce((acc, trend) => acc + trend.uptime, 0) / uptime_trends.length
  const avgResponseTime = response_time_trends.reduce((acc, trend) => acc + trend.avg_response_time, 0) / response_time_trends.length
  const totalErrors = top_errors.reduce((acc, error) => acc + error.count, 0)
  const avgErrorRate = error_rates.reduce((acc, rate) => acc + rate.error_rate, 0) / error_rates.length

  return (
    <DashboardLayout>
      <div className={DesignTokens.spacing.page}>
        {/* Header */}
        <PageHeader
          title="Analytics"
          subtitle="Detailed insights into your monitoring performance"
          actions={
            <>
              <div className="flex space-x-1">
                <Button
                  variant={timeRange === '7d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('7d')}
                >
                  7 Days
                </Button>
                <Button
                  variant={timeRange === '30d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('30d')}
                >
                  30 Days
                </Button>
                <Button
                  variant={timeRange === '90d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('90d')}
                >
                  90 Days
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </>
          }
        />

        {/* Summary Cards */}
        <div className={DesignTokens.spacing.statsGrid}>
          <StatCard
            icon={TrendingUp}
            iconColor="text-green-500"
            label="Average Uptime"
            value={`${avgUptime.toFixed(2)}%`}
            trend="+0.2% from last period"
            trendColor="success"
          />
          <StatCard
            icon={Clock}
            iconColor="text-blue-500"
            label="Avg Response Time"
            value={`${Math.round(avgResponseTime)}ms`}
            trend="-15ms from last period"
            trendColor="success"
          />
          <StatCard
            icon={AlertTriangle}
            iconColor="text-red-500"
            label="Error Rate"
            value={`${avgErrorRate.toFixed(2)}%`}
            trend="-0.1% from last period"
            trendColor="success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <UptimeTrendChart data={uptime_trends} />
          <ResponseTimeBarChart data={response_time_trends} />
        </div>

        {/* Error Analysis Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <ErrorRateAreaChart data={error_rates} />
          <TopErrorsDonutChart data={top_errors} />
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {avgUptime.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Uptime</div>
                <div className="text-xs text-green-600 mt-1">+0.2% vs last period</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(avgResponseTime)}ms
                </div>
                <div className="text-sm text-muted-foreground">Average Response Time</div>
                <div className="text-xs text-green-600 mt-1">-15ms vs last period</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {totalErrors}
                </div>
                <div className="text-sm text-muted-foreground">Total Errors</div>
                <div className="text-xs text-red-600 mt-1">+5 vs last period</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
