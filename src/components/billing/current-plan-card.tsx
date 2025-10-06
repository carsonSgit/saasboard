"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CreditCard, CheckCircle } from 'lucide-react'
import { blue } from '@radix-ui/colors'

const theme = {
  colors: { ...blue }
}

interface PlanLimits {
  monitors: number
  checkInterval: number
  retention: number
  alerts: boolean
}

interface CurrentPlan {
  name: string
  price: number
  limits: PlanLimits
}

interface CurrentPlanCardProps {
  currentPlan: CurrentPlan
  nextBillingDate: string
  paymentMethod: string
}

export function CurrentPlanCard({ 
  currentPlan, 
  nextBillingDate, 
  paymentMethod 
}: CurrentPlanCardProps) {
  const getIntervalText = (interval: number) => {
    if (interval === 30) return '30-second'
    if (interval === 60) return '1-minute'
    return '5-minute'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Plan</CardTitle>
          <Badge 
            variant="default" 
            className="capitalize" 
            style={{ backgroundColor: theme.colors.blue5, color: theme.colors.blue12 }}
          >
            {currentPlan.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">
                ${currentPlan.price}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </h3>
              <p className="text-gray-600 mt-1">
                {currentPlan.limits.monitors} monitors • {getIntervalText(currentPlan.limits.checkInterval)} checks
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Next billing: {new Date(nextBillingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Payment method: {paymentMethod}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Plan Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{currentPlan.limits.monitors} monitors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{currentPlan.limits.retention}-day data retention</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{currentPlan.limits.alerts ? 'Email alerts' : 'No alerts'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

