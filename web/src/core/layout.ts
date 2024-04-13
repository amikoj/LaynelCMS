import { LayoutTypes } from "../enums/layout";
import { UserInfo } from "../interfaces";
import { USER_NAME_KEY } from "../store/token";
import { decodeName } from "../utils/util";
import { Page } from "./base";
/**
 * 根布局
 */
export abstract class BaseLayout extends Page {
  layoutType: LayoutTypes;
  user: UserInfo;
  routes: any[];

  constructor() {
    super();
    this.layoutType = LayoutTypes.Vertical;
    this.loadUserInfo();
    this.initView();
    this.routes = JSON.parse(decodeName(window.laynel?.menu));
    console.log("get routes:", this.routes);
  }

  initView() {
    this.$.when(
      this.$("#nav-header .username").html(this.user?.nick),
      this.$("#nav-header .email").html(this.user?.email),
    ).done(function () {
      console.log("成功加载用户信息");
    });
  }

  loadUserInfo() {
    this.user = this.getUserInfo();
  }

  /**
   * 获取当前用户信息
   * @returns
   */
  getUserInfo(): UserInfo {
    const str = this.storage.get(USER_NAME_KEY);
    if (str) return JSON.parse(str);
    return {};
  }

  getRoute() {
    // const target = this.routes.find((route: any) => {
    //   route
    // })
  }
}
