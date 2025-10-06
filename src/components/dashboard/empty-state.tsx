/**
 * EmptyState Component
 * 
 * Consistent empty state component for use across all pages.
 * Displays when there's no data or content to show.
 */

import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  iconColor?: string
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  iconColor = 'text-gray-400',
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  const ActionIcon = action?.icon

  return (
    <Card className={className} role="status" aria-live="polite">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Icon className={cn('h-12 w-12 mb-4', iconColor)} aria-hidden="true" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-center mb-4 max-w-md">
          {description}
        </p>
        {action && (
          <Button 
            onClick={action.onClick} 
            aria-label={action.label}
          >
            {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" aria-hidden="true" />}
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

