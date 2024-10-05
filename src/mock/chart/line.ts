import Mock from 'mockjs'
import response from '../response'

Mock.mock('/api/chart/line', 'get', () => {
  return response([
    { name: 'Page A', uv: 400, pv: 400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 567, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 308, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 400, amt: 2400 },
    { name: 'Page G', uv: 0, pv: 123, amt: 2400 },
    { name: 'Page H', uv: 189, pv: 400, amt: 2400 },
    { name: 'Page I', uv: 489, pv: 230, amt: 2400 },
    { name: 'Page J', uv: 289, pv: 140, amt: 2400 },
    { name: 'Page K', uv: 149, pv: 120, amt: 2400 },
    { name: 'Page L', uv: 289, pv: 340, amt: 2400 },
    { name: 'Page M', uv: 409, pv: 345, amt: 2400 },
  ])
})
