export interface CheckResult {
  isUp: boolean;
  responseTime: number;
  statusCode: number;
  errorMessage: string | null;
}

export async function checkWebsite(url: string): Promise<CheckResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'UptimeMonitor/1.0'
      }
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      isUp: response.ok,
      responseTime,
      statusCode: response.status,
      errorMessage: response.ok ? null : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      isUp: false,
      responseTime: Date.now() - startTime,
      statusCode: 0,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
