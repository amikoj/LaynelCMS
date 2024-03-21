import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import axios from "axios";
import { ContentTypeEnum, RequestEnum } from "../enums/http-enum";
import { RequestConfigExtra, ResponseBody } from "../interface";
import { STORAGE_AUTHORIZE_KEY, getToken } from "../store/token";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 60000,
  headers: { "Content-Type": ContentTypeEnum.JSON },
});

const requestHandler = async (
  config: InternalAxiosRequestConfig & RequestConfigExtra,
): Promise<InternalAxiosRequestConfig> => {
  // 处理请求前的url
  const token = getToken();
  if (token && config.token !== false)
    config.headers.set(STORAGE_AUTHORIZE_KEY, `Bearer ${token}`);
  return config;
};

const responseHandler = (
  response: any,
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return response.data;
};

const errorHandler = (error: AxiosError): Promise<any> => {
  const token = getToken();

  if (error.response) {
    const { status } = error.response as AxiosResponse<ResponseBody>;
    if (status === 401) {
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      token.value = null;
      // 需要跳转到登陆页面
    }
  }
  return Promise.reject(error);
};
interface AxiosOptions<T> {
  url: string;
  params?: T;
  data?: T;
}
instance.interceptors.request.use(requestHandler);

instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
const instancePromise = <R = any, T = any>(
  options: AxiosOptions<T> & RequestConfigExtra,
): Promise<ResponseBody<R>> => {
  return new Promise((resolve, reject) => {
    instance
      .request(options)
      .then((res) => {
        resolve(res as any);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
  });
};
export const useGet = <R = any, T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<ResponseBody<R>> => {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePost = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<ResponseBody<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePut = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<ResponseBody<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const useDelete = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<ResponseBody<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  };
  return instancePromise<R, T>(options);
};
