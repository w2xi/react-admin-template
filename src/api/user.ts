import { request } from './request'
import type { LoginParams, LoginResult, LogoutParams } from '../interface/user/login'

export const login = (data: LoginParams) => {
  return request<LoginResult>({
    data,
    method: 'post',
    url: '/api/user/login',
  })
}

export const logout = (data: LogoutParams) => {
  return request({
    data,
    method: 'post',
    url: '/api/user/logout',
  })
}
