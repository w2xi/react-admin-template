import { useEffect, useState, useCallback } from 'react'
import { Table, Button, Rate, message, Popconfirm, Modal, Form, Input, Select } from 'antd'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { FormattedMessage } from 'react-intl'
import { useLocale } from '@/locales'
import { getArticleList, deleteArticle, editArticle } from '@/api/business.ts'
import type { Article, ArticleList } from '@/interface/business/article'
import type { TableProps, FormProps } from 'antd'

interface FieldType {
  author: string
  title: string
  importance: number
  status: 'published' | 'draft'
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

function ArticlesComponent() {
  const { formatMessage } = useLocale()
  const [pageData, setPageData] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const [data, setData] = useState<ArticleList>([])
  const [modalState, setModalState] = useState({
    visible: false,
    item: {} as Article,
  })

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
  }, [pageData.pageNum, pageData.pageSize])

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

  const showEditModal = (item: Article) => {
    setModalState({
      ...modalState,
      item,
      visible: true,
    })
  }

  const onSubmit: FormProps<FieldType>['onFinish'] = values => {
    editArticle({
      ...values,
      id: modalState.item.id,
    }).then(res => {
      if (res.code === 200) {
        message.success('Edit success')
        setModalState({
          ...modalState,
          visible: false,
        })
        getData()
      }
    })
  }

  useEffect(() => {
    getData()
  }, [getData])

  const columns: TableProps<Article>['columns'] = [
    { title: 'ID', dataIndex: 'id', width: 60, align: 'center' },
    { title: formatMessage({ id: 'article.table.columns.author' }), dataIndex: 'author' },
    {
      title: formatMessage({ id: 'article.table.columns.title' }),
      dataIndex: 'title',
      render: (title: string) => <span>{title}</span>,
    },
    {
      title: formatMessage({ id: 'article.table.columns.importance' }),
      dataIndex: 'importance',
      render: (importance: number) => <Rate value={importance} style={{ fontSize: 16 }} disabled />,
    },
    {
      title: formatMessage({ id: 'article.table.columns.create_time' }),
      dataIndex: 'create_time',
      width: 150,
    },
    {
      title: formatMessage({ id: 'article.table.columns.views' }),
      dataIndex: 'views',
      width: 100,
      render: (views: number) => <a>{views}</a>,
    },
    {
      title: formatMessage({ id: 'article.table.columns.status' }),
      dataIndex: 'status',
      render: (status: 'published' | 'draft') => (
        <Button
          type={status === 'published' ? 'primary' : 'default'}
          style={{ backgroundColor: status === 'published' ? '#13ce66' : '' }}
          size="small"
        >
          <FormattedMessage id={`article.table.status.${status}`} />
        </Button>
      ),
    },
    {
      title: formatMessage({ id: 'article.table.columns.actions' }),
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" size="small" onClick={() => showEditModal(record)}>
            <FormattedMessage id="article.table.actions.edit" />
          </Button>
          <Popconfirm
            title="Delete the article"
            description="Are you sure to delete this article?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>
              <FormattedMessage id="article.table.actions.delete" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <div css={styles}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pageData.pageNum,
          pageSize: pageData.pageSize,
          total: pageData.total,
          onChange: onPageChange,
        }}
        rowKey={record => record.id}
        scroll={{ x: 'max-content', y: 'calc(100vh - 200px)' }}
      />
      <Modal
        title="Edit"
        open={modalState.visible}
        onCancel={() => setModalState({ ...modalState, visible: false })}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Autohr"
            name="author"
            rules={[{ required: true, message: 'Please input author!' }]}
            initialValue={modalState.item.author}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
            initialValue={modalState.item.title}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Importance"
            name="importance"
            rules={[{ required: true, message: 'Please input importance!' }]}
            initialValue={modalState.item.importance}
          >
            <Rate style={{ fontSize: 16 }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input status!' }]}
            initialValue={modalState.item.status}
          >
            <Select>
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="draft">Draft</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ArticlesComponent

const styles = css`
  height: 100%;
  overflow: hidden;
  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table-container {
    height: 100%;
  }
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    .ant-table {
      flex: 1;
      .ant-btn + .ant-btn {
        margin-left: 10px;
      }
    }
    .ant-pagination {
      padding: 0 10px;
    }
  }
`
