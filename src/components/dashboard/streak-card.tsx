'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function StreakCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">🔥 3 week streak</p>
            <p className="text-sm text-gray-600 mt-1">
              Congrats, you're on a roll. Keep it going!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
