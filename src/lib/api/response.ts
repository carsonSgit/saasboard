import { NextResponse } from 'next/server'
import { AppError } from './errors'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
  meta?: {
    timestamp: string
    requestId?: string
    pagination?: PaginationMeta
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Create a successful API response
 */
export function apiResponse<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, any>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    },
    { status }
  )
}

/**
 * Create an error API response
 */
export function apiError(
  error: unknown,
  status?: number
): NextResponse<ApiResponse<never>> {
  // Handle AppError instances
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      },
      { status: error.statusCode }
    )
  }

  // Handle unknown errors
  console.error('Unhandled error:', error)
  const message = error instanceof Error ? error.message : 'An unexpected error occurred'
  
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    },
    { status: status || 500 }
  )
}

/**
 * Create a paginated API response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: PaginationMeta,
  status: number = 200
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        pagination
      }
    },
    { status }
  )
}

