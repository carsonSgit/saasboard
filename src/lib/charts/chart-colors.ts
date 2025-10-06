/**
 * Chart color palettes
 */

export const chartColors = {
  success: '#16a34a',
  warning: '#ca8a04',
  danger: '#dc2626',
  
  // Gradient colors for donut charts
  orange: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa'],
  
  // Response time thresholds
  responseTime: {
    good: '#16a34a',    // < 1000ms
    moderate: '#ca8a04', // 1000-3000ms
    slow: '#dc2626'      // > 3000ms
  }
}

/**
 * Get color based on response time value
 */
export function getResponseTimeColor(time: number): string {
  if (time < 1000) return chartColors.responseTime.good
  if (time < 3000) return chartColors.responseTime.moderate
  return chartColors.responseTime.slow
}

