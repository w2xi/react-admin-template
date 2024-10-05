export type BarChartResult = BarChartData[]

export type LineChartResult = LineChartData[]

export interface BarChartData {
  name: string
  uv: number
  pv: number
}

export interface LineChartData {
  name: string
  uv: number
  pv: number
  amt: number
}
