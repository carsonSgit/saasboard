"use client"

import { Button } from '@/components/ui/button'

interface PlanLimits {
  monitors: number
  checkInterval: number
  retention: number
  alerts: boolean
}

interface Plan {
  name: string
  price: number
  limits: PlanLimits
}

interface AvailablePlansGridProps {
  plans: Record<string, Plan>
  currentPlan: string
  onUpgrade: (planKey: string) => void
}

export function AvailablePlansGrid({ 
  plans, 
  currentPlan, 
  onUpgrade 
}: AvailablePlansGridProps) {
  const getIntervalText = (interval: number) => {
    if (interval === 30) return '30-second'
    if (interval === 60) return '1-minute'
    return '5-minute'
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Object.entries(plans).map(([key, tier]) => (
        <div 
          key={key} 
          className={`p-6 border rounded-lg ${
            key === currentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
            <div className="text-3xl font-bold mb-4">
              ${tier.price}
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• {tier.limits.monitors} monitors</li>
              <li>• {getIntervalText(tier.limits.checkInterval)} checks</li>
              <li>• {tier.limits.retention}-day retention</li>
              <li>• {tier.limits.alerts ? 'Email alerts' : 'No alerts'}</li>
            </ul>
            <Button
              variant={key === currentPlan ? 'outline' : 'default'}
              className="w-full"
              disabled={key === currentPlan}
              onClick={key !== currentPlan ? () => onUpgrade(key) : undefined}
            >
              {key === currentPlan ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

