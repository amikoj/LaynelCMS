import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { IResposeOptions } from '../interface';

const IGNORE_PATH = ['/login'];

@Middleware()
export class JSONMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log(' listenering request url:', ctx.url);
      const _res = await next();
      const result: IResposeOptions = {
        code: 0,
        message: '操作成功',
        data: _res,
      };

      if (Array.isArray(_res) && _res.length === 0) delete result.data;
      else if (Object.keys(_res).length === 0) delete result.data;

      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'json';
  }

  ignore(ctx: Context): boolean {
    const path = ctx.path;
    const isIgnore = IGNORE_PATH.includes(path);
    return isIgnore;
  }
}
