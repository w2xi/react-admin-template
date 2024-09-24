import { request } from "./request";
import type { ArticleListParams, ArticleListResult } from "../interface/business/article";

export const getArticleList = (params: ArticleListParams) => {
  console.log('params', params);
  
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