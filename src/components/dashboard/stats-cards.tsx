import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Monitor, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import { Database } from "@/types/database"
import { calculateUptime, calculateAvgResponseTime, calculateIncidentCount } from "@/lib/calculations"

type Monitor = Database['public']['Tables']['monitors']['Row']
type Check = Database['public']['Tables']['checks']['Row']
type Incident = Database['public']['Tables']['incidents']['Row']

interface StatsCardsProps {
  monitors: Monitor[];
  checks: Check[];
  incidents: Incident[];
}

export function StatsCards({ monitors, checks, incidents }: StatsCardsProps) {
  const totalMonitors = monitors.length;
  const avgUptime = calculateUptime(checks);
  const avgResponseTime = calculateAvgResponseTime(checks);
  const activeIncidents = calculateIncidentCount(incidents);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Monitors</CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <Monitor className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMonitors}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-100 text-green-600">
              <TrendingUp className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgUptime}%</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-yellow-100 text-yellow-600">
              <Clock className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResponseTime}ms</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-red-100 text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeIncidents}</div>
        </CardContent>
      </Card>
    </div>
  );
}
