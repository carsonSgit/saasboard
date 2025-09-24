import { Database } from '@/types/database'

type Check = Database['public']['Tables']['checks']['Row']
type Incident = Database['public']['Tables']['incidents']['Row']

export function calculateUptime(checks: Check[]): number {
  if (checks.length === 0) return 100;
  const upChecks = checks.filter(c => c.is_up).length;
  return Math.round((upChecks / checks.length) * 100 * 100) / 100;
}

export function calculateAvgResponseTime(checks: Check[]): number {
  if (checks.length === 0) return 0;
  const validChecks = checks.filter(c => c.response_time && c.is_up);
  if (validChecks.length === 0) return 0;
  
  const sum = validChecks.reduce((acc, c) => acc + c.response_time!, 0);
  return Math.round(sum / validChecks.length);
}

export function calculateIncidentCount(incidents: Incident[]): number {
  return incidents.filter(i => !i.is_resolved).length;
}

export function getUptimeColor(uptime: number): string {
  if (uptime >= 99.9) return 'text-green-600';
  if (uptime >= 99) return 'text-yellow-600';
  return 'text-red-600';
}

export function getResponseTimeColor(responseTime: number): string {
  if (responseTime <= 1000) return 'text-green-600';
  if (responseTime <= 3000) return 'text-yellow-600';
  return 'text-red-600';
}
