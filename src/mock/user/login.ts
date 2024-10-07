import Mock from 'mockjs'
import response from '../response'
import type { MockjsRequestOptions } from 'mockjs'

Mock.mock('/api/user/login', 'post', (config: MockjsRequestOptions) => {
  const { username } = JSON.parse(config.body)
  return response({
    username,
    token: 'admin-token',
  })
})
