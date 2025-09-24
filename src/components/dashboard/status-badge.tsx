import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  isUp: boolean;
  responseTime?: number;
}

export function StatusBadge({ isUp, responseTime }: StatusBadgeProps) {
  const getStatusColor = () => {
    if (!isUp) return 'bg-red-100 text-red-700 border-red-200';
    if (responseTime && responseTime > 3000) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getStatusText = () => {
    if (!isUp) return 'Down';
    if (responseTime && responseTime > 3000) return 'Degraded';
    return 'Operational';
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}>
      <div className={`w-2 h-2 rounded-full ${
        !isUp ? 'bg-red-500' : 
        responseTime && responseTime > 3000 ? 'bg-yellow-500' : 'bg-green-500'
      }`} />
      {getStatusText()}
    </div>
  );
}
