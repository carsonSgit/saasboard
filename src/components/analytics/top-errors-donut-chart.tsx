"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Chart from 'react-apexcharts'
import { BarChart3 } from 'lucide-react'
import { createTopErrorsDonutConfig } from '@/lib/charts'

interface TopError {
  error: string
  count: number
}

interface TopErrorsDonutChartProps {
  data: TopError[]
}

export function TopErrorsDonutChart({ data }: TopErrorsDonutChartProps) {
  const labels = data.map(error => error.error)
  const values = data.map(error => error.count)
  
  const { options, series } = createTopErrorsDonutConfig(labels, values)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-orange-500" />
          <span>Top Error Types</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Most common error types this period
        </div>
      </CardContent>
    </Card>
  )
}

