'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  duration?: number
}

interface ToastContextType {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const getBadgeProps = (variant: string) => {
  switch (variant) {
    case 'success':
      return { color: 'green', label: 'Success' }
    case 'destructive':
      return { color: 'red', label: 'Error' }
    case 'warning':
      return { color: 'yellow', label: 'Warning' }
    default:
      return { color: 'blue', label: 'Info' }
  }
}

export function ToastProvider({ children }: { readonly children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after duration
    const duration = toast.duration || 5000
    const timeoutId = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
    
    return () => clearTimeout(timeoutId)
  }, [])

  const contextValue = useMemo(() => ({ addToast }), [addToast])

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast.Provider swipeDirection="right" swipeThreshold={250}>
        {children}
        {/* Add vertical spacing between toasts using gap-3 */}
        <Toast.Viewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col md:max-w-[420px]" />
        {toasts.map((toast, idx) => {
          const { color, label } = getBadgeProps(toast.variant || 'default')
          return (
            <Toast.Root
              key={toast.id}
              className={cn(
                "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-4 pr-2 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
                // Remove variant-based background/text color
                "bg-background text-foreground"
              )}
              duration={toast.duration || 5000}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="flex flex-col space-y-1 w-full" >
                  <div className="flex flex-row items-center">
                    <Toast.Title className="font-semibold">
                      {toast.title}
                    </Toast.Title>
                    <Badge
                      className={cn(
                        "ml-auto mr-4 px-2 py-0.5 text-xs font-medium",
                        color === 'green' && "bg-green-100 text-green-800",
                        color === 'red' && "bg-red-100 text-red-800",
                        color === 'yellow' && "bg-yellow-100 text-yellow-800",
                        color === 'blue' && "bg-blue-100 text-blue-800"
                      )}
                    >
                      {label}
                    </Badge>
                  </div>
                  {toast.description && (
                    <Toast.Description className="text-sm opacity-90">
                      {toast.description}
                    </Toast.Description>
                  )}
                </div>
              </div>
              <Toast.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
                <X className="h-4 w-4" />
              </Toast.Close>
            </Toast.Root>
          )
        })}
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
