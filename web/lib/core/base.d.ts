/// <reference types="jquery" />
import { EventBus } from "../utils/eventbus";
import { AxiosInstance } from "axios";
export declare abstract class Page {
    _eventBus: EventBus;
    $: JQueryStatic;
    useGet: any;
    usePost: any;
    request: AxiosInstance;
    constructor();
    /**
     *@description 屏幕尺寸改变
     */
    onResize(): void;
    /**
     * @description dom构建完成后即可执行
     */
    onReady(): void;
    /**
     * @description dom加载完成，加载顺序 onReady -> onLoad -> onMounted
     */
    onLoad(): void;
    /**
     * @description window加载完成【页面所有资源，包含网络请求的静态资源全部完成加载后触发】
     */
    onMounted(): void;
    initListener(): void;
    get(key: string): any;
    fire(event: any, data: any): void;
    on(events: string[] | string, callback: any, that?: any): void;
    off(events: any[] | any, callback: any): void;
}
