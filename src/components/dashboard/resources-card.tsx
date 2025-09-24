'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function ResourcesCard() {
  const homePageUrl = 'https://johns-newsletter-a3f809.b...'
  const signupPageUrl = 'https://johns-newsletter-a3f809.b...'

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Home page
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={homePageUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(homePageUrl)}
                className="px-3"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Signup page
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={signupPageUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(signupPageUrl)}
                className="px-3"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
