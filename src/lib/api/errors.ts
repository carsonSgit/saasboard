/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly details?: Record<string, any>

  constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: Record<string, any>
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * 400 - Validation Error
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: Record<string, any>) {
    super(400, 'VALIDATION_ERROR', message, details)
  }
}

/**
 * 401 - Authentication Error
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(401, 'AUTHENTICATION_ERROR', message)
  }
}

/**
 * 403 - Authorization Error
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(403, 'AUTHORIZATION_ERROR', message)
  }
}

/**
 * 404 - Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(404, 'NOT_FOUND', `${resource} not found`)
  }
}

/**
 * 409 - Conflict Error
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(409, 'CONFLICT', message)
  }
}

/**
 * 429 - Rate Limit Error
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(429, 'RATE_LIMIT_EXCEEDED', message)
  }
}

/**
 * 500 - Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(500, 'INTERNAL_SERVER_ERROR', message)
  }
}

/**
 * 503 - Service Unavailable
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(503, 'SERVICE_UNAVAILABLE', message)
  }
}

/**
 * Database Error
 */
export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: Record<string, any>) {
    super(500, 'DATABASE_ERROR', message, details)
  }
}

/**
 * External Service Error
 */
export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(
      502,
      'EXTERNAL_SERVICE_ERROR',
      message || `External service ${service} error`
    )
  }
}

