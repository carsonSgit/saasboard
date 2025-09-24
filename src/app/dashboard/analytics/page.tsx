'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockAnalyticsData, mockMonitors, mockChecks } from '@/lib/mock-data'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  AlertTriangle,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">
              Detailed insights into your monitoring performance
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {avgUptime.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +0.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(avgResponseTime)}ms
              </div>
              <p className="text-xs text-muted-foreground">
                -15ms from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {avgErrorRate.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                -0.1% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {totalErrors}
              </div>
              <p className="text-xs text-muted-foreground">
                This {timeRange}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Uptime Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Uptime Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={{
                  chart: {
                    type: 'line',
                    height: 300,
                    toolbar: { show: false },
                    animations: { enabled: true, easing: 'easeinout', speed: 800 }
                  },
                  colors: ['#16a34a'],
                  stroke: { curve: 'smooth', width: 3 },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories: uptime_trends.slice(-14).map(trend => 
                      new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    ),
                    labels: { style: { colors: '#6b7280', fontSize: '12px' } }
                  },
                  yaxis: {
                    title: { text: 'Uptime %', style: { color: '#6b7280', fontSize: '12px' } },
                    labels: { style: { colors: '#6b7280', fontSize: '12px' } },
                    min: 90,
                    max: 100
                  },
                  grid: { borderColor: '#f3f4f6', strokeDashArray: 3 },
                  tooltip: { y: { formatter: (value) => `${value.toFixed(2)}%` } }
                }}
                series={[{
                  name: 'Uptime',
                  data: uptime_trends.slice(-14).map(trend => trend.uptime)
                }]}
                type="line"
                height={300}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Uptime percentage over the last 14 days
              </div>
            </CardContent>
          </Card>

          {/* Response Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Response Time Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={{
                  chart: {
                    type: 'bar',
                    height: 300,
                    toolbar: { show: false },
                    animations: { enabled: true, easing: 'easeinout', speed: 800 }
                  },
                  colors: response_time_trends.slice(0, 12).map(trend => {
                    if (trend.avg_response_time < 1000) return '#16a34a'
                    if (trend.avg_response_time < 3000) return '#ca8a04'
                    return '#dc2626'
                  }),
                  plotOptions: {
                    bar: { borderRadius: 4, columnWidth: '60%', distributed: true }
                  },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories: response_time_trends.slice(0, 12).map(trend => `${trend.hour}:00`),
                    labels: { style: { colors: '#6b7280', fontSize: '12px' }, rotate: -45 }
                  },
                  yaxis: {
                    title: { text: 'Response Time (ms)', style: { color: '#6b7280', fontSize: '12px' } },
                    labels: { style: { colors: '#6b7280', fontSize: '12px' } }
                  },
                  grid: { borderColor: '#f3f4f6', strokeDashArray: 3 },
                  tooltip: { y: { formatter: (value) => `${Math.round(value)}ms` } },
                  legend: { show: false }
                }}
                series={[{
                  name: 'Response Time',
                  data: response_time_trends.slice(0, 12).map(trend => Math.round(trend.avg_response_time))
                }]}
                type="bar"
                height={300}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Average response time by hour (last 12 hours)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Analysis Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Error Rate Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Error Rate Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={{
                  chart: {
                    type: 'area',
                    height: 300,
                    toolbar: { show: false },
                    animations: { enabled: true, easing: 'easeinout', speed: 800 }
                  },
                  colors: ['#dc2626'],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.1,
                      stops: [0, 100]
                    }
                  },
                  stroke: { curve: 'smooth', width: 3 },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories: error_rates.map(rate => 
                      new Date(rate.day).toLocaleDateString('en-US', { weekday: 'short' })
                    ),
                    labels: { style: { colors: '#6b7280', fontSize: '12px' } }
                  },
                  yaxis: {
                    title: { text: 'Error Rate %', style: { color: '#6b7280', fontSize: '12px' } },
                    labels: { style: { colors: '#6b7280', fontSize: '12px' } },
                    min: 0,
                    max: 5
                  },
                  grid: { borderColor: '#f3f4f6', strokeDashArray: 3 },
                  tooltip: { y: { formatter: (value) => `${value.toFixed(2)}%` } }
                }}
                series={[{
                  name: 'Error Rate',
                  data: error_rates.map(rate => rate.error_rate)
                }]}
                type="area"
                height={300}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Error rate over the last 7 days
              </div>
            </CardContent>
          </Card>

          {/* Top Errors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <span>Top Error Types</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={{
                  chart: {
                    type: 'donut',
                    height: 300,
                    toolbar: { show: false },
                    animations: { enabled: true, easing: 'easeinout', speed: 800 }
                  },
                  colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa'],
                  labels: top_errors.map(error => error.error),
                  dataLabels: { enabled: false },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '70%',
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: 'Total Errors',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#374151',
                            formatter: () => top_errors.reduce((acc, error) => acc + error.count, 0).toString()
                          }
                        }
                      }
                    }
                  },
                  legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    fontSize: '12px'
                  },
                  tooltip: {
                    y: {
                      formatter: (value) => `${value} errors`
                    }
                  }
                }}
                series={top_errors.map(error => error.count)}
                type="donut"
                height={300}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Most common error types this period
              </div>
            </CardContent>
          </Card>
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
