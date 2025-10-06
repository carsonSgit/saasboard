import { ApexOptions } from 'apexcharts'
import { baseChartConfig, axisLabelStyle } from './chart-options'
import { chartColors } from './chart-colors'
import { chartFormatters } from './chart-formatters'

/**
 * Creates configuration for error rate area chart
 * @param categories - Array of date labels
 * @param data - Array of error rate percentage values
 * @returns ApexOptions configuration
 */
export const createErrorRateAreaConfig = (
  categories: string[],
  data: number[]
): { options: ApexOptions; series: ApexAxisChartSeries } => ({
  options: {
    ...baseChartConfig,
    chart: {
      ...baseChartConfig.chart,
      type: 'area',
      height: 300
    },
    colors: [chartColors.danger],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: axisLabelStyle }
    },
    yaxis: {
      title: { text: 'Error Rate %', style: axisLabelStyle },
      labels: { style: axisLabelStyle },
      min: 0,
      max: 5
    },
    grid: baseChartConfig.grid,
    tooltip: { y: { formatter: chartFormatters.percentage } }
  },
  series: [{ name: 'Error Rate', data }]
})

