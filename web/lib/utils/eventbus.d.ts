/**
 * @description 事件总线实现
 */
export declare class EventBus {
    listeners: any;
    constructor();
    _getListeners(name: string): any;
    _setListeners(name: any, listener: any): void;
    _addListener(event: string, newListener?: any): void;
    _destroy(): void;
    /**
     * @description 添加事件监听
     * @param events 事件集合后时间名
     * @param callback 回调函数
     * @param that callback的指定绑定对象
     */
    on(events: string[] | string, callback: any, that?: any): void;
    off(events: any[] | any, callback: any): void;
    createEvent(data: any): InternalEvent;
    handleError(error: any): boolean;
    _invokeListener(event: InternalEvent, args: any, listener: any): any;
    _invokeListeners(event: InternalEvent, args: any, listener: any): any;
    /**
     * @description 发送事件
     * @param type
     * @param data
     */
    fire(type: any, data: any): any;
    _removeListener(event: string, callback: any): void;
}
export declare class InternalEvent {
    cancelBubble: boolean;
    defaultPrevented: boolean;
    returnValue: any;
    constructor();
    stopPropagation(): void;
    preventDefault(): void;
    init(data: any): void;
}
/**
 * Invoke function. Be fast...
 *
 * @param {Function} fn
 * @param {any[]} args
 *
 * @return {any}
 */
export declare function invokeFunction(fn: any, args: any): any;
export declare const eventBus: EventBus;
export default eventBus;
