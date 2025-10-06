/**
 * Performance Optimization Utilities
 * 
 * Utilities for code splitting, lazy loading, and performance monitoring
 */

import { ComponentType, lazy, LazyExoticComponent } from 'react'

/**
 * Lazy load a component with a custom delay for smoother transitions
 */
export function lazyWithDelay<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  delay: number = 200
): LazyExoticComponent<T> {
  return lazy(() => 
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([module]) => module)
  )
}

/**
 * Preload a component for faster subsequent loads
 */
export function preloadComponent(importFunc: () => Promise<any>) {
  return importFunc()
}

/**
 * Debounce function for performance-sensitive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for rate-limiting expensive operations
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Intersection Observer hook utility for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  })
}

/**
 * Performance monitoring utilities
 */
export const performance = {
  /**
   * Mark a performance measurement point
   */
  mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name)
    }
  },

  /**
   * Measure performance between two marks
   */
  measure(name: string, startMark: string, endMark: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark)
        const measure = window.performance.getEntriesByName(name)[0]
        return measure?.duration
      } catch (e) {
        console.warn('Performance measurement failed:', e)
      }
    }
    return 0
  },

  /**
   * Get navigation timing
   */
  getNavigationTiming() {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        domInteractive: navigation?.domInteractive - navigation?.fetchStart
      }
    }
    return null
  }
}

/**
 * Image optimization utility - returns optimized image URL
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  quality: number = 75
): string {
  // For Next.js Image optimization
  if (!src || src.startsWith('data:')) return src
  
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  params.set('q', quality.toString())
  
  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`
}

