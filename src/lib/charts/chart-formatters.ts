/**
 * Chart tooltip formatters
 */

export const chartFormatters = {
  /**
   * Format percentage values
   */
  percentage: (value: number): string => `${value.toFixed(2)}%`,

  /**
   * Format milliseconds
   */
  milliseconds: (value: number): string => `${Math.round(value)}ms`,

  /**
   * Format error count
   */
  errorCount: (value: number): string => `${value} errors`,

  /**
   * Format uptime percentage
   */
  uptime: (value: number): string => `${value.toFixed(2)}%`,
  
  /**
   * Format response time
   */
  responseTime: (value: number): string => `${Math.round(value)}ms`
}

