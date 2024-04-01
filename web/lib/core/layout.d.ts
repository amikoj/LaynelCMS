import { LayoutTypes } from "../enums/layout";
import { UserInfo } from "../interfaces";
import { Page } from "./base";
/**
 * 根布局
 */
export declare abstract class BaseLayout extends Page {
    layoutType: LayoutTypes;
    user: UserInfo;
    constructor();
    initView(): void;
    loadUserInfo(): void;
    /**
     * 获取当前用户信息
     * @returns
     */
    getUserInfo(): UserInfo;
}
