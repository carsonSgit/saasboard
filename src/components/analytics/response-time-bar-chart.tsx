"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { Clock } from 'lucide-react'
import { createResponseTimeBarConfig } from '@/lib/charts'

interface ResponseTimeTrend {
  hour: number
  avg_response_time: number
}

interface ResponseTimeBarChartProps {
  data: ResponseTimeTrend[]
}

export function ResponseTimeBarChart({ data }: ResponseTimeBarChartProps) {
  const recentData = data.slice(0, 12)
  const categories = recentData.map(trend => `${trend.hour}:00`)
  const values = recentData.map(trend => Math.round(trend.avg_response_time))
  
  const { options, series } = createResponseTimeBarConfig(categories, values)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>Response Time Distribution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Average response time by hour (last 12 hours)
        </div>
      </CardContent>
    </Card>
  )
}

