import { assign, isArray, bind, slice } from "lodash";

const FN_REF: string = "__fn";

/**
 * @description 事件总线实现
 */
export class EventBus {
  listeners: any;

  constructor() {
    this.listeners = {};
  }

  _getListeners(name: string) {
    return this.listeners[name];
  }

  _setListeners(name, listener: any) {
    this.listeners[name] = listener;
  }

  _addListener(event: string, newListener?: any) {
    let listener = this._getListeners(event),
      previousListener;

    // no prior listeners
    if (!listener) {
      this._setListeners(event, newListener);

      return;
    }

    // ensure we order listeners by priority from
    // 0 (high) to n > 0 (low)
    while (listener) {
      if (listener.priority < newListener.priority) {
        newListener.next = listener;

        if (previousListener) {
          previousListener.next = newListener;
        } else {
          this._setListeners(event, newListener);
        }

        return;
      }

      previousListener = listener;
      listener = listener.next;
    }

    // add new listener to back
    previousListener.next = newListener;
  }

  _destroy() {
    this.listeners = {};
  }

  /**
   * @description 添加事件监听
   * @param events 事件集合后时间名
   * @param callback 回调函数
   * @param that callback的指定绑定对象
   */
  on(events: string[] | string, callback: any, that?: any) {
    events = isArray(events) ? events : [events];
    let actualCallback: any = callback;
    if (that) {
      actualCallback = bind(callback, that);
      actualCallback[FN_REF] = callback[FN_REF] || callback;
    }

    events.forEach((e: any) => {
      this._addListener(e, { callback: actualCallback, next: null });
    });
  }

  off(events: any[] | any, callback: any) {
    events = isArray(events) ? events : [events];
    events.forEach(function (event: string) {
      this._removeListener(event, callback);
    });
  }

  createEvent(data: any) {
    const event = new InternalEvent();
    event.init(data);
    return event;
  }

  handleError(error: any) {
    return this.fire("error", { error: error }) === false;
  }

  _invokeListener(event: InternalEvent, args: any, listener: any) {
    let returnValue;

    if (listener.callback.__isTomb) {
      return returnValue;
    }

    try {
      // returning false prevents the default action
      returnValue = invokeFunction(listener.callback, args);

      // stop propagation on return value
      if (returnValue !== undefined) {
        event.returnValue = returnValue;
        event.stopPropagation();
      }

      // prevent default on return false
      if (returnValue === false) {
        event.preventDefault();
      }
    } catch (error) {
      if (!this.handleError(error)) {
        console.error("unhandled error in event listener", error);

        throw error;
      }
    }

    return returnValue;
  }

  _invokeListeners(event: InternalEvent, args: any, listener: any) {
    let returnValue;

    while (listener) {
      // handle stopped propagation
      if (event.cancelBubble) {
        break;
      }

      returnValue = this._invokeListener(event, args, listener);

      listener = listener.next;
    }

    return returnValue;
  }

  /**
   * @description 发送事件
   * @param type
   * @param data
   */
  fire(type: any, data: any) {
    let event, returnValue;

    const args = slice.call(arguments);

    if (typeof type === "object") {
      data = type;
      type = data.type;
    }

    if (!type) {
      throw new Error("no event type specified");
    }

    const firstListener = this.listeners[type];

    if (!firstListener) {
      return;
    }

    if (data instanceof InternalEvent) {
      // we are fine, we alread have an event
      event = data;
    } else {
      event = this.createEvent(data);
    }

    args[0] = event;

    const originalType = event.type;

    if (type !== originalType) {
      event.type = type;
    }

    try {
      returnValue = this._invokeListeners(event, args, firstListener);
    } finally {
      // reset event type after delegation
      if (type !== originalType) {
        event.type = originalType;
      }
    }

    // set the return value to false if the event default
    // got prevented and no other return value exists
    if (returnValue === undefined && event.defaultPrevented) {
      returnValue = false;
    }

    return returnValue;
  }

  _removeListener(event: string, callback: any) {
    let listener = this._getListeners(event),
      nextListener,
      previousListener,
      listenerCallback;

    if (!callback) {
      // clear listeners
      this._setListeners(event, null);

      return;
    }

    while (listener) {
      nextListener = listener.next;

      listenerCallback = listener.callback;

      if (
        listenerCallback === callback ||
        listenerCallback[FN_REF] === callback
      ) {
        if (previousListener) {
          previousListener.next = nextListener;
        } else {
          // new first listener
          this._setListeners(event, nextListener);
        }
      }

      previousListener = listener;
      listener = nextListener;
    }
  }
}

export class InternalEvent {
  cancelBubble: boolean;
  defaultPrevented: boolean;
  returnValue: any;

  constructor() { }

  stopPropagation() {
    this.cancelBubble = true;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }

  init(data: any) {
    assign(this, data || {});
  }
}

/**
 * Invoke function. Be fast...
 *
 * @param {Function} fn
 * @param {any[]} args
 *
 * @return {any}
 */
export function invokeFunction(fn: any, args: any) {
  return fn.apply(null, args);
}

export const eventBus = new EventBus();
export default eventBus;
