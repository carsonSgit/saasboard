'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockChecks } from '@/lib/mock-data'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export function ResponseTimeChart() {
  // Get last 24 hours of data
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  const recentChecks = mockChecks.filter(check => 
    new Date(check.checked_at) >= twentyFourHoursAgo
  )

  // Group by hour and calculate average response time
  const hourlyData = recentChecks.reduce((acc, check) => {
    const hour = new Date(check.checked_at).getHours()
    if (!acc[hour]) {
      acc[hour] = { total: 0, count: 0, hour }
    }
    if (check.is_up && check.response_time) {
      acc[hour].total += check.response_time
      acc[hour].count += 1
    }
    return acc
  }, {} as Record<number, { total: number; count: number; hour: number }>)

  const chartData = Object.values(hourlyData).map(data => ({
    hour: `${data.hour}:00`,
    responseTime: data.count > 0 ? Math.round(data.total / data.count) : 0
  })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour))

  const maxResponseTime = Math.max(...chartData.map(d => d.responseTime), 1000)

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: chartData.map(data => {
      if (data.responseTime < 1000) return '#16a34a' // green
      if (data.responseTime < 3000) return '#ca8a04' // yellow
      return '#dc2626' // red
    }),
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.map(d => d.hour),
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        rotate: -45
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Response Time (ms)',
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 3
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}ms`
      },
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: false
    }
  }

  const series = [{
    name: 'Response Time',
    data: chartData.map(d => d.responseTime)
  }]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Response Time (24 Hours)</span>
          <div className="text-sm text-muted-foreground">
            Max: {maxResponseTime}ms
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Average response time over the last 24 hours
          </span>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>&lt;1s</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>1-3s</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>&gt;3s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
