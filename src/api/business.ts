import { request } from './request'
import type { ArticleListParams, ArticleListResult, ArticleEditParams } from '../interface/business/article'

export const getArticleList = (params: ArticleListParams) => {
  return request<ArticleListResult>({
    method: 'get',
    url: '/api/business/article/list',
    data: params,
  })
}

export const deleteArticle = (id: number) => {
  return request({
    method: 'delete',
    url: '/api/business/article/delete',
    data: {
      id,
    },
  })
}

export const editArticle = (params: ArticleEditParams) => {
  return request({
    method: 'post',
    url: '/api/business/article/edit',
    data: params,
  })
}
