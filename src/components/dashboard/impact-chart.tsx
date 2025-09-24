'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export function ImpactChart() {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 300,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ['#8b5cf6', '#ec4899'], // Purple and magenta to match beehiiv style
    labels: ['beehiiv', 'other'],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: '#374151',
              formatter: () => '100%'
            }
          }
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 8,
        height: 8,
        radius: 0
      },
      itemMargin: {
        horizontal: 20,
        vertical: 5
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const series = [85, 15] // 85% beehiiv, 15% other

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>beehiiv impact</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Subscribers driven through the beehiiv network vs. alternative growth channels
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </CardContent>
    </Card>
  )
}
