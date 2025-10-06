export interface UptimeTrend {
  date: string
  uptime: number
}

export interface ResponseTimeTrend {
  hour: number
  avg_response_time: number
  p95_response_time: number
}

export interface ErrorRate {
  day: string
  error_rate: number
}

export interface TopError {
  error: string
  count: number
  percentage: number
}

export interface AnalyticsData {
  uptime_trends: UptimeTrend[]
  response_time_trends: ResponseTimeTrend[]
  error_rates: ErrorRate[]
  top_errors: TopError[]
}

export const mockAnalyticsData: AnalyticsData = {
  uptime_trends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    uptime: Math.random() * 5 + 95, // 95-100% uptime
  })),
  response_time_trends: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    avg_response_time: Math.random() * 500 + 200, // 200-700ms
    p95_response_time: Math.random() * 1000 + 500, // 500-1500ms
  })),
  error_rates: Array.from({ length: 7 }, (_, i) => ({
    day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    error_rate: Math.random() * 2, // 0-2% error rate
  })),
  top_errors: [
    { error: 'Connection timeout', count: 45, percentage: 35 },
    { error: 'HTTP 500', count: 28, percentage: 22 },
    { error: 'DNS resolution failed', count: 20, percentage: 16 },
    { error: 'SSL certificate error', count: 15, percentage: 12 },
    { error: 'HTTP 404', count: 12, percentage: 9 },
    { error: 'Other', count: 8, percentage: 6 },
  ],
}

