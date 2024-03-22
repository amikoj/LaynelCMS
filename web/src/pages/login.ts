import { LoginDTO, ResultInfo, ValidateInfo } from "../interfaces";
import { useGet, usePost } from "../utils/request";
import { HttpStatus } from "../enums/http-enum";
import { USER_NAME_KEY, setToken } from "../store/token";
import storage from "../utils/storage";
import { ResponseBody } from "../interface";
import Toastify from "toastify-js";
import { Toast } from "../utils/util";
import { Page } from "../core/base";

export const CAPTCHA_REFRESH: string = "login.refreshCaptcha"; // 刷新
export const LOGIN_SUCCESS: string = "login.success"; // 登录成功
export const LOGIN_FAILED: string = "login.failed"; // 登录失败

/**
 * @description 登陆页面聚合功能
 */
export default class Login extends Page {
  loginForm: LoginDTO;

  /**
   * @description 初始化操作，初始化数据，发起验证码请求
   */
  constructor() {
    super();
    this.loginForm = {
      username: "",
      password: "",
      captcha: "",
      captchaId: "",
    };
  }

  onReady(): void {
    // 页面已完成加载,请求获取验证码
    this.getCaptchaBase64();
  }

  /**
   * @description 获取验证码
   * @returns base64 返回图片base64
   */
  async getCaptchaBase64() {
    const res = await useGet("/auth/captcha");
    if (res.code === HttpStatus.SUCCESS_CODE) {
      const { captchaId, imageBase64 } = res.data;
      this.loginForm.captchaId = captchaId;
      this.fire(CAPTCHA_REFRESH, res.data); // 通过事件发送
      // 设置
      document.getElementById("captcha").setAttribute("src", captchaId);
      return imageBase64;
    }
  }

  /**
   * @description 验证form数据
   */
  async validate(): Promise<ResultInfo> {
    const result: ResultInfo = { data: [] };
    if (!this.loginForm.captcha) {
      const error: ValidateInfo = {
        prop: "captcha",
        message: "验证码不能为空",
      };
      result.data.push(error);
    }

    if (!this.loginForm.username) {
      const error: ValidateInfo = {
        prop: "username",
        message: "用户名不能为空",
      };
      result.data.push(error);
    }

    if (!this.loginForm.password) {
      const error: ValidateInfo = {
        prop: "password",
        message: "密码不能为空",
      };
      result.data.push(error);
    }
    if (result.data.length) Toast(`校验不通过`, 3000);

    return result.data.length ? result : null;
  }

  /**
   * @description 用户登陆
   */
  async login() {
    const res: ResponseBody<any> = await usePost("/auth/login", this.loginForm);
    if (res.code === HttpStatus.SUCCESS_CODE) {
      const { id, email, name, nick, age, token } = res.data;
      setToken(token); // 保存token
      storage.save(
        USER_NAME_KEY,
        JSON.stringify({ id, email, name, nick, age }),
      );
      window.location.href = "/admin/dashborad"; //跳转首页
      this.fire(LOGIN_SUCCESS, res); // 登录成功事件

      Toastify({
        text: `登陆成功`,
        backgroundColor: "green",
      });
    } else {
      console.log("登陆失败：", res.message);
      Toastify({
        text: `登陆失败：${res.message}`,
        backgroundColor: "red",
      });
      this.fire(LOGIN_FAILED, res); // 登录失败
      throw new Error(`登陆失败：${res.message}`);
    }
  }
}
