import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { FC } from 'react'

const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFoundPage
