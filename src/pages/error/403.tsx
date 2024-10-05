import React from 'react'
import { Button, Result } from 'antd'

const App: React.FC = () => (
  <Result
    status="403"
    title="Forbidden"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />
)

export default App
