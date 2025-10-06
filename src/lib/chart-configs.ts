/**
 * @deprecated This file has been split into separate chart configuration files.
 * Please import from '@/lib/charts' instead.
 * This file will be removed in a future version.
 */

// Re-export from new locations for backward compatibility
export { 
  createUptimeTrendConfig,
  createResponseTimeBarConfig,
  createErrorRateAreaConfig,
  createTopErrorsDonutConfig
} from './charts'
