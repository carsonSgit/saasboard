/**
 * Skeleton Component
 * 
 * Loading skeleton component for displaying loading states.
 * Provides smooth shimmer animation for better UX.
 */

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-gray-200",
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton variants for common use cases
 */

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 space-y-3", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )} 
        />
      ))}
    </div>
  )
}

