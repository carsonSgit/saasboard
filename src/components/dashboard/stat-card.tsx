/**
 * StatCard Component
 * 
 * Unified statistics display component with icon, value, label, and optional trend.
 * Provides consistent styling and hover effects for all stat cards.
 */

import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DesignTokens } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface StatCardProps {
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  label: string
  value: string | number
  sublabel?: string
  trend?: string
  trendColor?: 'success' | 'warning' | 'error' | 'neutral'
  actionLink?: {
    href: string
    label: string
  }
  className?: string
  onClick?: () => void
}

export function StatCard({
  icon: Icon,
  iconColor = 'text-blue-500',
  iconBgColor,
  label,
  value,
  sublabel,
  trend,
  trendColor = 'neutral',
  actionLink,
  className,
  onClick
}: StatCardProps) {
  const trendColorClass = trendColor === 'success' ? 'text-green-600' :
                         trendColor === 'warning' ? 'text-yellow-600' :
                         trendColor === 'error' ? 'text-red-600' :
                         'text-gray-600'

  return (
    <Card 
      className={cn(
        'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
      aria-label={`${label}: ${value}${trend ? `, ${trend}` : ''}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <div 
          className={cn(
            'flex items-center justify-center',
            iconBgColor && 'p-2 rounded-lg',
            iconBgColor
          )}
          aria-hidden="true"
        >
          <Icon className={cn('h-4 w-4', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sublabel && (
          <p className="text-xs text-muted-foreground">
            {sublabel}
          </p>
        )}
        {trend && (
          <p className={cn('text-xs mt-1', trendColorClass)}>
            {trend}
          </p>
        )}
        {actionLink && (
          <Link 
            href={actionLink.href}
            className={cn(
              'flex items-center text-xs text-blue-600 mt-2',
              DesignTokens.interactive.linkHover
            )}
          >
            {actionLink.label}
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

