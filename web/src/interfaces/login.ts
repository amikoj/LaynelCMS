/**
 * @description 登陆表单
 */
export interface LoginDTO {
  name: string;
  password: string;
  captcha: string;
  captchaId: string;
}


/**
 * 当前登陆用户信息
 */
export interface UserInfo {
  id?: number,
  email?: string,
  icon?: string,
  nick?: string,
  age?: number
}