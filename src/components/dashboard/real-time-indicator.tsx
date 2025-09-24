'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Wifi, WifiOff } from 'lucide-react'

export function RealTimeIndicator() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simulate real-time connection status
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // Simulate occasional disconnections
      if (Math.random() > 0.95) {
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 2000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <span>Real-time Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">Connection</span>
            </div>
            <Badge variant={isConnected ? 'default' : 'destructive'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Last Update</span>
            <span className="text-sm text-muted-foreground">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Data Stream</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-muted-foreground">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Updates every 5 seconds</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
