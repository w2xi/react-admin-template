import Mock from 'mockjs'
import response from '../response'

Mock.mock('/api/user/logout', 'post', () => {
  return response({})
})
