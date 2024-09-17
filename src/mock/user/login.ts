import Mock from 'mockjs'
import response from '../response'

// 登录
Mock.mock('/api/user/login', 'post', (config: any) => {
  const { username } = JSON.parse(config.body)
  return response({
    username,
    token: 'admin-token',
  })
})