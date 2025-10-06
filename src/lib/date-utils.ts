/**
 * Date and time utility functions for formatting and calculations
 */

/**
 * Calculates duration between two timestamps and formats it
 * @param startedAt - Start timestamp (ISO string)
 * @param resolvedAt - End timestamp (ISO string) or null for current time
 * @returns Formatted duration string like "2h 15m" or "3d 5h"
 */
export const getDuration = (startedAt: string, resolvedAt?: string | null): string => {
  const start = new Date(startedAt)
  const end = resolvedAt ? new Date(resolvedAt) : new Date()
  const diffMs = end.getTime() - start.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`
  if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`
  return `${diffMins}m`
}

/**
 * Formats a date for display in charts
 * @param date - Date string or Date object
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatChartDate = (
  date: string | Date,
  options: { month?: 'short' | 'long'; day?: 'numeric'; weekday?: 'short' } = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    month: options.month || 'short',
    day: options.day || 'numeric',
    weekday: options.weekday
  })
}

/**
 * Formats relative time from a timestamp
 * @param timestamp - ISO timestamp string
 * @returns Formatted relative time like "5 minutes ago"
 */
export const getRelativeTime = (timestamp: string): string => {
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
  return past.toLocaleDateString()
}

