import eventBus, { EventBus } from "../utils/eventbus";
import $ from "jquery";
import request, { useGet, usePost } from "../utils/request";
import { AxiosInstance, all } from "axios";
import Toastify from "toastify-js";
import { MessageType } from "../enums/toast";
import { Route } from "../interface";
import { getToken } from "../store/token";
import storage, { Storage } from "../utils/storage";

const allowList: string[] = ["/admin/login"];

export abstract class Page {
  _eventBus: EventBus;
  $: JQueryStatic;
  useGet: any;
  usePost: any;
  request: AxiosInstance;
  toastify: any;
  route: Route;
  storage: Storage


  constructor() {
    this._eventBus = eventBus;
    this.$ = $;
    this.useGet = useGet;
    this.usePost = usePost;
    this.request = request;
    this.toastify = Toastify;
    this.storage = storage
    this.route = window.location;
    this.initListener();
    this.onCheckPermission();

  }

  onCheckPermission() {
    const path = this.route.pathname;

    if (this.islogined()) {
      if (allowList.includes(path)) {
        window.location.href = "/admin/dashborad";
      }
    } else {
      if (!allowList.includes(path)) {
        window.location.href = "/admin/login";
      }
    }
  }

  /**
   *@description 屏幕尺寸改变
   */
  onResize() { }

  /**
   * @description dom构建完成后即可执行
   */
  onReady() { }

  /**
   * @description dom加载完成，加载顺序 onReady -> onLoad -> onMounted
   */
  onLoad() { }

  /**
   * @description window加载完成【页面所有资源，包含网络请求的静态资源全部完成加载后触发】
   */
  onMounted() { }

  initListener() {
    // 屏幕尺寸改变
    window.addEventListener("resize", () => this.onResize());
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        //当页面加载状态为完全结束时进入, dom记载完成
        this.onLoad();
      } else {
        //DOM构建了就会执行，先于complete执行
        this.onReady();
      }
    };

    window.onload = () => {
      this.onMounted();
    };
  }

  get(key: string) {
    let targetKey = "";
    switch (key) {
      case "eventBus":
        targetKey = "_eventBus";
        break;
      case "":
        break;
      default:
        if (this[key]) targetKey = key;
        break;
    }
    if (targetKey) return this[targetKey];
  }

  fire(event: any, data: any) {
    this._eventBus.fire(event, data);
  }

  on(events: string[] | string, callback: any, that?: any) {
    this._eventBus.on(events, callback, that);
  }

  off(events: any[] | any, callback: any) {
    this._eventBus.off(events, callback);
  }

  /**
   *  通过form id获取form数据
   * @param id
   */
  getFormData(id: string) {
    const formData = this.$(`#${id}`).serializeArray();
    console.log("get form original data:", formData);
    const json = {};
    this.$.each(formData, function () {
      json[this.name] = this.value || null;
    });
    return json;
  }

  toast(op: any, type: any = MessageType.Info): void {
    if (typeof op === "string") {
      let backgroundColor = "#00b09b";

      if (type && type.trim()) {
        switch (type) {
          case MessageType.Error:
            backgroundColor = "red";
            break;
          case MessageType.Success:
            backgroundColor = "green";
            break;
          case MessageType.Warn:
            backgroundColor = "#ffe384";
            break;
          default:
            backgroundColor = type;
            break;
        }
      }
      Toastify({
        text: op,
        style: {
          background: backgroundColor,
        },
      }).showToast();
    } else if (typeof op === "object") {
      Toastify(op).showToast();
    }
  }

  /**
   * 当前页面是否已登录
   */
  islogined() {
    return !!getToken();
  }

  getToken() {
    return getToken();
  }
}
