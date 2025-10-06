import { ApexOptions } from 'apexcharts'
import { baseChartConfig } from './chart-options'
import { chartColors } from './chart-colors'
import { chartFormatters } from './chart-formatters'

/**
 * Creates configuration for top errors donut chart
 * @param labels - Array of error type labels
 * @param data - Array of error counts
 * @returns ApexOptions configuration
 */
export const createTopErrorsDonutConfig = (
  labels: string[],
  data: number[]
): { options: ApexOptions; series: number[] } => ({
  options: {
    ...baseChartConfig,
    chart: {
      ...baseChartConfig.chart,
      type: 'donut',
      height: 300
    },
    colors: chartColors.orange,
    labels,
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Errors',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              formatter: () => data.reduce((acc, val) => acc + val, 0).toString()
            }
          }
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px'
    },
    tooltip: {
      y: {
        formatter: chartFormatters.errorCount
      }
    }
  },
  series: data
})

