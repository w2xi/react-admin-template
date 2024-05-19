import { request } from "./request";
import { LoginResponse } from "../interface/user/login.interface";

export const login = (data: { username: string; password: string }) => {
  return request<LoginResponse>({
    data,
    method: 'post',
    url: '/api/user/login',
  });
}
