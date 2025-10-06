import { ApexOptions } from 'apexcharts'
import { baseChartConfig, axisLabelStyle } from './chart-options'
import { getResponseTimeColor } from './chart-colors'
import { chartFormatters } from './chart-formatters'

/**
 * Creates configuration for response time bar chart
 * @param categories - Array of time labels
 * @param data - Array of response time values in ms
 * @returns ApexOptions configuration
 */
export const createResponseTimeBarConfig = (
  categories: string[],
  data: number[]
): { options: ApexOptions; series: ApexAxisChartSeries } => ({
  options: {
    ...baseChartConfig,
    chart: {
      ...baseChartConfig.chart,
      type: 'bar',
      height: 300
    },
    colors: data.map(getResponseTimeColor),
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: '60%', distributed: true }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: axisLabelStyle, rotate: -45 }
    },
    yaxis: {
      title: { text: 'Response Time (ms)', style: axisLabelStyle },
      labels: { style: axisLabelStyle }
    },
    grid: baseChartConfig.grid,
    tooltip: { y: { formatter: chartFormatters.responseTime } },
    legend: { show: false }
  },
  series: [{ name: 'Response Time', data }]
})

