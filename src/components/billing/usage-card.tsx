"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress, ProgressIndicator } from '@radix-ui/react-progress'
import { green, gray } from '@radix-ui/colors'
import { LucideIcon } from 'lucide-react'

const theme = {
  colors: { ...green, ...gray }
}

interface UsageCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  used: number
  limit: number
  animated?: boolean
  animatedValue?: number
}

export function UsageCard({ 
  icon: Icon, 
  iconColor, 
  title, 
  used, 
  limit, 
  animated = false,
  animatedValue 
}: UsageCardProps) {
  const usagePercentage = (used / limit) * 100
  const displayValue = animated && animatedValue !== undefined ? animatedValue : used
  const displayPercentage = animated && animatedValue !== undefined 
    ? (animatedValue / limit) * 100 
    : usagePercentage

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {title === 'Check Usage' ? 'Checks This Month' : 'Monitors Used'}
            </span>
            <span className="text-sm text-gray-600">
              {displayValue.toLocaleString()} / {limit.toLocaleString()}
            </span>
          </div>
          
          <Progress 
            value={displayPercentage} 
            max={100} 
            style={{ 
              height: '8px', 
              borderRadius: '9999px', 
              backgroundColor: theme.colors.gray3,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <ProgressIndicator 
              style={{ 
                backgroundColor: theme.colors.green8,
                borderRadius: '9999px',
                transition: 'all 0.3s ease-in-out',
                height: '100%',
                width: '100%',
                transform: `translateX(-${100 - displayPercentage}%)`
              }}
            />
          </Progress>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {usagePercentage.toFixed(1)}% used
            </span>
            <span className="text-gray-600">
              {(limit - used).toLocaleString()} remaining
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

