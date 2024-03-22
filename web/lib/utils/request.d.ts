import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { RequestConfigExtra, ResponseBody } from "../interface";
declare const instance: AxiosInstance;
export default instance;
export declare const useGet: <R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra) => Promise<ResponseBody<R>>;
export declare const usePost: <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra) => Promise<ResponseBody<R>>;
export declare const usePut: <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra) => Promise<ResponseBody<R>>;
export declare const useDelete: <R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra) => Promise<ResponseBody<R>>;
