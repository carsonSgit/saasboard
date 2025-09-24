'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  subtitle: string
}

function KPICard({ title, value, change, changeType, subtitle }: KPICardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
              <span>{change}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPICards() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      <KPICard
        title="Active Subscribers"
        value="6"
        change="↑ 100%"
        changeType="positive"
        subtitle="from 0 (last 4 weeks)"
      />
      <KPICard
        title="Open Rate"
        value="18.8%"
        change="↑ 100%"
        changeType="positive"
        subtitle="from 0% (last 4 weeks)"
      />
      <KPICard
        title="Click Rate"
        value="100%"
        change="↑ 100%"
        changeType="positive"
        subtitle="from 0% (last 4 weeks)"
      />
    </div>
  )
}
