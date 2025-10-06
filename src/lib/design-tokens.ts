/**
 * Design Tokens - UI/UX Consistency System
 * 
 * Centralized design tokens for consistent spacing, typography, colors,
 * transitions, and interactive states across all dashboard pages.
 */

export const DesignTokens = {
  // ============================================================
  // SPACING TOKENS
  // ============================================================
  spacing: {
    page: 'space-y-4 sm:space-y-6',
    section: 'space-y-3 sm:space-y-4',
    grid: 'gap-4 sm:gap-6',
    statsGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
    statsGridDouble: 'grid gap-4 sm:gap-6 md:grid-cols-2',
    statsGridFull: 'grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4',
    cardPadding: 'p-4 sm:p-6',
    compactPadding: 'p-3 sm:p-4'
  },
  
  // ============================================================
  // TYPOGRAPHY TOKENS
  // ============================================================
  typography: {
    pageTitle: 'text-2xl sm:text-3xl font-bold text-gray-900',
    pageSubtitle: 'text-sm sm:text-base text-gray-600 mt-1',
    cardTitle: 'text-base sm:text-lg font-semibold',
    sectionTitle: 'text-lg sm:text-xl font-semibold mb-3 sm:mb-4',
    h1: 'text-2xl sm:text-3xl font-bold',
    h2: 'text-xl sm:text-2xl font-bold',
    h3: 'text-lg sm:text-xl font-semibold',
    h4: 'text-base sm:text-lg font-semibold',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
    tiny: 'text-xs'
  },
  
  // ============================================================
  // COLOR TOKENS (Status)
  // ============================================================
  colors: {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      icon: 'text-green-500',
      hover: 'hover:bg-green-100'
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      hover: 'hover:bg-yellow-100'
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      icon: 'text-red-500',
      hover: 'hover:bg-red-100'
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      hover: 'hover:bg-blue-100'
    },
    neutral: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-200',
      icon: 'text-gray-500',
      hover: 'hover:bg-gray-100'
    }
  },
  
  // ============================================================
  // TRANSITION TOKENS
  // ============================================================
  transitions: {
    default: 'transition-all duration-200',
    fast: 'transition-all duration-150',
    medium: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    hover: 'hover:shadow-lg transition-shadow duration-200',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-200'
  },
  
  // ============================================================
  // INTERACTIVE STATE TOKENS
  // ============================================================
  interactive: {
    cardHover: 'hover:bg-gray-50 transition-colors cursor-pointer',
    cardHoverScale: 'hover:scale-[1.02] hover:shadow-xl transition-all duration-300',
    buttonHover: 'hover:opacity-90 transition-opacity',
    scaleHover: 'hover:scale-105 transition-transform duration-200',
    focusRing: 'focus:ring-2 focus:ring-blue-500 focus:outline-none',
    linkHover: 'hover:text-blue-600 transition-colors'
  },
  
  // ============================================================
  // SHADOW TOKENS
  // ============================================================
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none'
  },
  
  // ============================================================
  // BORDER RADIUS TOKENS
  // ============================================================
  radius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  },
  
  // ============================================================
  // BUTTON VARIANTS
  // ============================================================
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 bg-white',
    ghost: 'hover:bg-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  },
  
  // ============================================================
  // ANIMATION TOKENS
  // ============================================================
  animations: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideDown: 'animate-slideDown',
    scaleIn: 'animate-scaleIn',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce'
  }
}

/**
 * Helper function to get status color classes
 */
export function getStatusColors(status: 'success' | 'warning' | 'error' | 'info' | 'neutral') {
  return DesignTokens.colors[status]
}

/**
 * Helper function to combine design tokens
 */
export function combineTokens(...tokens: string[]) {
  return tokens.join(' ')
}

