import { message as $message } from 'antd';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config?.data;
  },
  error => {
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    error.message && $message.error(errorMessage);

    return {
      code: 1001,
      msg: errorMessage,
      result: null,
    };
  },
);

export type Response<T> = {
  code: number;
  msg: string;
  result: T;
};

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T>(
  config: AxiosRequestConfig
): Promise<Response<T>> => {
  return axiosInstance(config);
};
