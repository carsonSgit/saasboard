/**
 * PageHeader Component
 * 
 * Standardized page header component used across all dashboard pages.
 * Ensures consistent styling, spacing, and behavior for page headers.
 */

import { ReactNode } from 'react'
import { DesignTokens } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4', className)}>
      <div className="flex-1">
        <h1 className={DesignTokens.typography.pageTitle}>{title}</h1>
        {subtitle && (
          <p className={DesignTokens.typography.pageSubtitle}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 sm:space-x-2">
          {actions}
        </div>
      )}
    </div>
  )
}

