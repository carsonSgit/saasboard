import { ApexOptions } from 'apexcharts'
import { baseChartConfig, axisLabelStyle } from './chart-options'
import { chartColors } from './chart-colors'
import { chartFormatters } from './chart-formatters'

/**
 * Creates configuration for uptime trend line chart
 * @param categories - Array of date labels
 * @param data - Array of uptime percentage values
 * @returns ApexOptions configuration
 */
export const createUptimeTrendConfig = (
  categories: string[],
  data: number[]
): { options: ApexOptions; series: ApexAxisChartSeries } => ({
  options: {
    ...baseChartConfig,
    chart: {
      ...baseChartConfig.chart,
      type: 'line',
      height: 300
    },
    colors: [chartColors.success],
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: axisLabelStyle }
    },
    yaxis: {
      title: { text: 'Uptime %', style: axisLabelStyle },
      labels: { style: axisLabelStyle },
      min: 90,
      max: 100
    },
    grid: baseChartConfig.grid,
    tooltip: { y: { formatter: chartFormatters.uptime } }
  },
  series: [{ name: 'Uptime', data }]
})

