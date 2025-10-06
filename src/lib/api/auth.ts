import { NextRequest } from 'next/server'
import { AuthenticationError, AuthorizationError } from './errors'

/**
 * Extract user ID from request (mock implementation)
 * In production, this would integrate with Clerk or other auth provider
 */
export async function getUserFromRequest(request: NextRequest): Promise<string> {
  // TODO: Integrate with Clerk
  // For now, return mock user ID
  const userId = request.headers.get('x-user-id') || 'mock-user-id'
  
  if (!userId) {
    throw new AuthenticationError('User not authenticated')
  }
  
  return userId
}

/**
 * Verify cron secret for cron job routes
 */
export function verifyCronSecret(request: NextRequest): void {
  const authHeader = request.headers.get('authorization')
  const expectedSecret = `Bearer ${process.env.CRON_SECRET}`
  
  if (authHeader !== expectedSecret) {
    throw new AuthorizationError('Invalid cron secret')
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  signature: string | null,
  expectedSignature: string
): void {
  if (!signature || signature !== expectedSignature) {
    throw new AuthorizationError('Invalid webhook signature')
  }
}

/**
 * Extract pagination parameters from request
 */
export function getPaginationParams(request: NextRequest): {
  page: number
  limit: number
} {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
  
  return { page, limit }
}

/**
 * Calculate pagination metadata
 */
export function calculatePaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  }
}

