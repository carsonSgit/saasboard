'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockChecks } from '@/lib/mock-data'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export function UptimeChart() {
  // Get last 30 days of data
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  const recentChecks = mockChecks.filter(check => 
    new Date(check.checked_at) >= thirtyDaysAgo
  )

  // Group by day and calculate uptime percentage
  const dailyData = recentChecks.reduce((acc, check) => {
    const day = new Date(check.checked_at).toISOString().split('T')[0]
    if (!acc[day]) {
      acc[day] = { up: 0, total: 0, day }
    }
    acc[day].total += 1
    if (check.is_up) {
      acc[day].up += 1
    }
    return acc
  }, {} as Record<string, { up: number; total: number; day: string }>)

  const chartData = Object.values(dailyData)
    .map(data => ({
      day: new Date(data.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      uptime: data.total > 0 ? Math.round((data.up / data.total) * 100) : 100
    }))
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
    .slice(-7) // Show last 7 days

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
      if (data.uptime >= 99.9) return '#16a34a' // green
      if (data.uptime >= 99) return '#ca8a04' // yellow
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
      categories: chartData.map(d => d.day),
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        }
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
        text: 'Uptime (%)',
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        formatter: (value) => `${value}%`
      },
      min: 95,
      max: 100
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 3
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`
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
    name: 'Uptime',
    data: chartData.map(d => d.uptime)
  }]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uptime (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Daily uptime percentage over the last 7 days
        </div>
      </CardContent>
    </Card>
  )
}
