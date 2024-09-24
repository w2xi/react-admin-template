export interface ArticleListParams {
  page?: number;
  limit?: number;
}

export type ArticleListResult = {
  records: ArticleList;
  total: number;
};

export type ArticleList = Article[];

export interface Article {
  id: number;
  author: string;
  title: string;
  content: string;
  importance: number;
  create_time: string;
  views: number;
  status: 'published' | 'draft';
}