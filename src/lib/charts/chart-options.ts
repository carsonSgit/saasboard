import { ApexOptions } from 'apexcharts'

/**
 * Base chart configuration shared across all charts
 */
export const baseChartConfig: ApexOptions = {
  chart: {
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 }
  },
  grid: {
    borderColor: '#f3f4f6',
    strokeDashArray: 3
  }
}

/**
 * Base axis label styling
 */
export const axisLabelStyle = {
  colors: '#6b7280',
  fontSize: '12px'
}

