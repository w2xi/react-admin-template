import { Form, Input, Button } from "antd" 
import { login } from "@/api/user.ts"
import './index.scss'
import type { LoginParams } from '@/interface/user/login.ts'
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/user";

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
};


const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserStore();

  const onFinished = (form: LoginParams) => {
    login(form).then(res => {
      console.log(res);
      if (res.code === 200) {
        setUserInfo(res.result)
        navigate('/')
      }
    })
  }

  return (
    <div className="login-container">
      <Form<LoginParams>
        initialValues={initialValues}
        onFinish={onFinished}
      >
        <h2 className="title">Login</h2>
        <Form.Item 
          name="username"
          rules={[
            { 
              required: true, 
              message: 'Please type your username' 
            }
          ]}
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item 
          name="password"
          rules={[
            { 
              required: true, 
              message: 'Please type your password' 
            }
          ]}
        >
          <Input type="password" placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Button className="submit-btn" htmlType="submit" type="primary">login</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;