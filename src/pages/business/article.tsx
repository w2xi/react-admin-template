import { useEffect, useState, useCallback } from 'react';
import { Table, Button, Rate, message, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { getArticleList, deleteArticle } from '@/api/business.ts';
import styles from './article.module.scss'
import type { Article, ArticleList } from '@/interface/business/article';
import type { TableProps } from 'antd';


function ArticlesComponent() {
  const [pageData, setPageData] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const [data, setData] = useState<ArticleList>([]);

  const onPageChange = (pageNum: number, pageSize?: number) => {
    setPageData({
      ...pageData,
      pageNum,
      pageSize: pageSize || pageData.pageSize,
    })
  }

  const onDelete = (id: number) => {
    deleteArticle(id).then(res => {
      if (res.code === 200) {
        message.success('Delete success')
        getData()
      }
    })
  }

  const getData = useCallback(() => {
    getArticleList({
      page: pageData.pageNum,
      limit: pageData.pageSize,
    }).then(res => {
      if (res.code === 200) {
        const { records, total } = res.result
        records.forEach(item => {
          item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm')
        })
        setData(records)
        setPageData({
          ...pageData,
          total,
        })
      }
    })
  }, [getArticleList, pageData.pageNum, pageData.pageSize])

  useEffect(() => {
    getData()
  }, [getData])

  const columns: TableProps<Article>['columns'] = [
    { title: 'ID', dataIndex: 'id', width: 60, align: 'center' },
    { title: 'Author', dataIndex: 'author', },
    { 
      title: 'Title', 
      dataIndex: 'title', 
      render: (title: string) => (
        <span>{ title }</span>
      )
    },
    { 
      title: 'Importance', 
      dataIndex: 'importance', 
      render: (importance: number) => (
        <Rate value={importance} style={{ fontSize: 16 }} disabled />
      )
    },
    { title: 'Create Time', dataIndex: 'create_time', width: 150 },
    { 
      title: 'Views', 
      dataIndex: 'views', 
      render: (views: number) => (
        <a>{ views }</a>
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      render: (status: 'published' | 'draft') => (
        <Button 
          type={status === 'published' ? 'primary' : 'default'}
          style={{ backgroundColor: status === 'published' ? '#13ce66' : '#eee' }}
        >{status}</Button>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Delete the article"
          description="Are you sure to delete this article?"
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" size="small">Delete</Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <Table
      className={styles['article-table']}
      dataSource={data} 
      columns={columns} 
      pagination={{ 
        current: pageData.pageNum,
        pageSize: pageData.pageSize,
        total: pageData.total,
        onChange: onPageChange,
      }}
      rowKey={(record) => record.id}
    />
  )
}

export default ArticlesComponent;