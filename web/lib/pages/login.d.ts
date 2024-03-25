import { LoginDTO, ResultInfo } from "../interfaces";
import { Page } from "../core/base";
export declare const CAPTCHA_REFRESH: string;
export declare const LOGIN_SUCCESS: string;
export declare const LOGIN_FAILED: string;
/**
 * @description 登陆页面聚合功能
 */
export default class Login extends Page {
    loginForm: LoginDTO;
    /**
     * @description 初始化操作，初始化数据，发起验证码请求
     */
    constructor();
    initView(): void;
    onReady(): void;
    /**
     * @description 获取验证码
     * @returns base64 返回图片base64
     */
    getCaptchaBase64(): Promise<any>;
    /**
     * @description 验证form数据
     */
    validate(): Promise<ResultInfo>;
    /**
     * @description 用户登陆
     */
    login(): Promise<void>;
}
