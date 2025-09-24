'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  BarChart3, 
  Monitor,
  AlertTriangle,
  BarChart,
  Users,
  CreditCard,
  Settings,
  User,
  LogOut,
  Menu, 
  X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Monitors', href: '/dashboard/monitors', icon: Monitor },
  { name: 'Incidents', href: '/dashboard/incidents', icon: AlertTriangle },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

const bottomNavigation = [
  { name: 'Profile', href: '/people', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Sign Out', href: '/dashboard/signout', icon: LogOut },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={cn(
      "flex flex-col h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      isMobile && isCollapsed && "absolute left-0 top-0 z-50 shadow-lg"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SaaSBoard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:bg-gray-100 text-gray-700",
                  isCollapsed ? "px-2" : "px-3"
                )}
              >
                <item.icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-3")} />
                {!isCollapsed && (
                  <span>{item.name}</span>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Plan Section */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-900">Pro Plan</span>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-xs text-blue-700 mb-2">Website monitoring service</p>
            <div className="flex items-center justify-between text-xs text-blue-700 mb-2">
              <span>5 of 10 monitors used</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        {bottomNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                isCollapsed ? "px-2" : "px-3"
              )}
            >
              <item.icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && (
                <span>{item.name}</span>
              )}
            </Button>
          </Link>
        ))}
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
