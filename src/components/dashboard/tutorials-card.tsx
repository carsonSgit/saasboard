'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function TutorialsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutorials</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Learn how to get started on beehiiv and utilize all our features, directly from the beehiiv team.
        </p>
        <Button variant="outline" className="w-full">
          Tutorials
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
