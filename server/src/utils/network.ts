import { IResposeOptions } from '../interface';

export const SUCCESS_CODE = 0; // 请求成功
export const UN_AUTHORIZED = 401; // 未验证
export const AUTH_EXPIRED_TIMES = 40001; // token已过期
export const CAPTCHED_NOT_MATCHED = 40002; // 验证码不匹配
export const USER_WHIT_PASSWORD_NOT_MATCHED = 30001; // 用户密码不匹配
export const VAILDATE_PARAMS_NOT_MATCHED = 50001; //参数校验不通过
export const DATA_SET_NOT_EXIST = 50002; // 数据不存在
export const OPERATOR_WITH_RELATION = 5003; // 存在关联关系，操作无法成功

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
