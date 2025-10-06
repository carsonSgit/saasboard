"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface SummaryMetric {
  icon: LucideIcon
  iconColor: string
  title: string
  value: string | number
  change?: string
  changeColor?: string
}

interface AnalyticsSummaryProps {
  metrics: SummaryMetric[]
}

export function AnalyticsSummary({ metrics }: AnalyticsSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className={`h-4 w-4 ${metric.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.iconColor.replace('text-', 'text-')}`}>
                {metric.value}
              </div>
              {metric.change && (
                <p className={`text-xs text-muted-foreground ${metric.changeColor || ''}`}>
                  {metric.change}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

