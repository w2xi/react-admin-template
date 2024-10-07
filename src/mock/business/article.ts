import Mock from 'mockjs'
import response from '../response'
import type { MockjsRequestOptions } from 'mockjs'
import type { ArticleList } from '@/interface/business/article'

const data: ArticleList = []
const count = 100

for (let i = 0; i < count; i++) {
  data.push(
    Mock.mock({
      id: '@increment',
      author: '@first',
      title: '@title',
      content: '@title',
      importance: '@integer(1, 3)',
      create_time: '@datetime',
      views: '@integer(300, 5000)',
      'status|1': ['published', 'draft'],
    }),
  )
}

Mock.mock('/api/business/article/list', 'get', (config: MockjsRequestOptions) => {
  const { page = 1, limit = 20 } = JSON.parse(config.body)
  const start = (page - 1) * limit
  const end = start + limit
  return response({
    records: data.slice(start, end),
    total: count,
  })
})

Mock.mock('/api/business/article/delete', 'delete', (config: MockjsRequestOptions) => {
  const { id } = JSON.parse(config.body)
  const index = data.findIndex(item => item.id === id)
  if (index !== -1) {
    data.splice(index, 1)
  }
  return response({})
})

Mock.mock('/api/business/article/edit', 'post', (config: MockjsRequestOptions) => {
  const { id, author, title, importance, status } = JSON.parse(config.body)
  const index = data.findIndex(item => item.id === id)
  if (index !== -1) {
    data[index] = {
      ...data[index],
      author,
      title,
      importance,
      status,
    }
  }
  return response({})
})
