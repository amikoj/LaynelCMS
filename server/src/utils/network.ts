import { IResposeOptions } from '../interface';

export const SUCCESS_CODE = 0; // 请求成功
export const AUTH_EXPIRED_TIMES = 40001; // token已过期
export const CAPTCHED_NOT_MATCHED = 30001; // 验证码不匹配

// 请求成功返回json数据
export const ok = (result: any, message = 'success'): IResposeOptions => {
  return {
    code: SUCCESS_CODE,
    message,
    data: result ?? null,
  };
};
// 错误返回
export const failed = (code: number, message = 'request failed', data) => {
  return {
    code,
    message,
    data,
  };
};
