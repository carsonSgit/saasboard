'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { Download } from 'lucide-react'

export function SubscriberGrowthChart() {
  // Mock subscriber growth data over the last 4 weeks
  const chartData = [
    { date: 'Apr 09', subscribers: 0 },
    { date: 'Apr 16', subscribers: 2 },
    { date: 'Apr 23', subscribers: 4 },
    { date: 'Apr 30', subscribers: 6 },
    { date: 'May 06', subscribers: 6 }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'area',
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
    colors: ['#ec4899'], // Magenta color to match beehiiv style
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.map(d => d.date),
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
        text: 'Subscribers',
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
      },
      min: 0,
      max: 8,
      tickAmount: 4
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} subscribers`
      },
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      markers: {
        width: 8,
        height: 8,
        radius: 0
      },
      itemMargin: {
        horizontal: 10
      }
    }
  }

  const series = [{
    name: 'Subscribers',
    data: chartData.map(d => d.subscribers)
  }]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Subscribers</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Shows all active subscribers
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </CardContent>
    </Card>
  )
}
