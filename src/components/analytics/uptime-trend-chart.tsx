"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { TrendingUp } from 'lucide-react'
import { createUptimeTrendConfig } from '@/lib/charts'
import { formatChartDate } from '@/lib/date-utils'

interface UptimeTrend {
  date: string
  uptime: number
}

interface UptimeTrendChartProps {
  data: UptimeTrend[]
}

export function UptimeTrendChart({ data }: UptimeTrendChartProps) {
  const recentData = data.slice(-14)
  const categories = recentData.map(trend => formatChartDate(trend.date, { month: 'short', day: 'numeric' }))
  const values = recentData.map(trend => trend.uptime)
  
  const { options, series } = createUptimeTrendConfig(categories, values)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span>Uptime Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="line"
          height={300}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Uptime percentage over the last 14 days
        </div>
      </CardContent>
    </Card>
  )
}

