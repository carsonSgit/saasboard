'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  rightSidebar?: React.ReactNode
}

export function DashboardLayout({ children, rightSidebar }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        isMobile ? "ml-0" : ""
      )}>
        <div className="flex">
          <div className="flex-1 p-4 md:p-6">
            {children}
          </div>
          {rightSidebar && !isMobile && (
            <div className="w-80 border-l border-gray-200 bg-white p-4 overflow-auto">
              {rightSidebar}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
