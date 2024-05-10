import { LayoutTypes } from "../enums/layout";
import { UserInfo } from "../interfaces";
import { Page } from "./base";
/**
 * 根布局
 */
export declare abstract class BaseLayout extends Page {
    layoutType: LayoutTypes;
    user: UserInfo;
    routes: any[];
    constructor();
    initView(): void;
    loadUserInfo(): void;
    /**
     * 获取当前用户信息
     * @returns
     */
    getUserInfo(): UserInfo;
    getRoute(): void;
}
