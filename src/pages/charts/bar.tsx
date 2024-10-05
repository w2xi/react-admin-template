import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getBarChartData } from '@/api/chart.ts'
import type { BarChartResult } from '@/interface/chart'

function BarComponent() {
  const [data, setData] = useState<BarChartResult>([])

  useEffect(() => {
    getBarChartData().then(res => {
      if (res.code === 200) {
        setData(res.result)
      }
    })
  }, [])

  return (
    <ResponsiveContainer>
      <BarChart
        width={730}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarComponent
