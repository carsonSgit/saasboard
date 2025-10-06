"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { AlertTriangle } from 'lucide-react'
import { createErrorRateAreaConfig } from '@/lib/charts'
import { formatChartDate } from '@/lib/date-utils'

interface ErrorRate {
  day: string
  error_rate: number
}

interface ErrorRateAreaChartProps {
  data: ErrorRate[]
}

export function ErrorRateAreaChart({ data }: ErrorRateAreaChartProps) {
  const categories = data.map(rate => formatChartDate(rate.day, { weekday: 'short' }))
  const values = data.map(rate => rate.error_rate)
  
  const { options, series } = createErrorRateAreaConfig(categories, values)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Error Rate Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="area"
          height={300}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Error rate over the last 7 days
        </div>
      </CardContent>
    </Card>
  )
}

