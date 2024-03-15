/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

/**
 * @description 接口正常返回数据格式
 */
export interface IResposeOptions {
  code: number; // 0 成功
  message: string;
  data?: any;
}
