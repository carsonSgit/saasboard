import { Button } from '@/components/ui/button'
import { Monitor, BarChart3, Settings, CreditCard } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SaaSBoard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard/monitors">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Monitors</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Pricing</span>
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
