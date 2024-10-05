import { request } from './request'
import type { BarChartResult, LineChartResult } from '../interface/chart'

export const getBarChartData = () => {
  return request<BarChartResult>({
    method: 'get',
    url: '/api/chart/bar',
  })
}

export const getLineChartData = () => {
  return request<LineChartResult>({
    method: 'get',
    url: '/api/chart/line',
  })
}
