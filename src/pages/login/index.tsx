import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, theme as antTheme } from 'antd'
import { FormattedMessage } from 'react-intl'
import { useLocale } from '@/locales'
import './index.scss'
import { login } from '@/api/user.ts'
import useUserStore from '@/stores/user'
import type { LoginParams } from '@/interface/user/login.ts'

const { useToken } = antTheme

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
}

const Login = () => {
  const navigate = useNavigate()
  const { setUserInfo } = useUserStore()
  const { formatMessage } = useLocale()
  const { token } = useToken()

  const onFinished = (form: LoginParams) => {
    login(form).then(res => {
      if (res.code === 200) {
        setUserInfo(res.result)
        navigate('/')
      }
    })
  }

  return (
    <div className="login-container" style={{ backgroundColor: token.colorBgLayout }}>
      <Form<LoginParams> style={{ width: 260 }} initialValues={initialValues} onFinish={onFinished}>
        <h1 className="title">Login</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'user.login.username' }),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'user.login.username' })} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'user.login.password' }),
            },
          ]}
        >
          <Input type="password" placeholder={formatMessage({ id: 'user.login.password' })} />
        </Form.Item>
        <Form.Item>
          <Button className="submit-btn" htmlType="submit" type="primary">
            <FormattedMessage id="user.login.button" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
