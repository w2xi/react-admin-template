import { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getLineChartData } from '@/api/chart.ts'
import type { LineChartResult } from '@/interface/chart'
import type { CategoricalChartState } from 'recharts/types/chart/types'

const onClick = (e?: CategoricalChartState) => {
  console.log(e)
}

function LineComponent() {
  const [data, setData] = useState<LineChartResult>([])

  useEffect(() => {
    getLineChartData().then(res => {
      if (res.code === 200) {
        setData(res.result)
      }
    })
  }, [])

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }} onClick={onClick}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineComponent
