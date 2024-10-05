import { message as $message } from 'antd'
import axios from 'axios'
import useAppStore from '@/stores/app'
import type { AxiosRequestConfig } from 'axios'

const { setLoading } = useAppStore.getState()

const axiosInstance = axios.create({
  timeout: 6000,
})

axiosInstance.interceptors.request.use(
  config => {
    setLoading(true)
    return config
  },
  error => {
    setLoading(false)
    Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  config => {
    setLoading(false)
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config?.data
  },
  error => {
    setLoading(false)
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常'

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络'
    } else {
      errorMessage = error?.message
    }

    console.dir(error)
    error.message && $message.error(errorMessage)

    return {
      code: 1001,
      msg: errorMessage,
      result: null,
    }
  },
)

export type Response<T> = {
  code: number
  msg: string
  result: T
}

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T>(config: AxiosRequestConfig): Promise<Response<T>> => {
  return axiosInstance(config)
}
