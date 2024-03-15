import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { IResposeOptions } from '../interface';

const IGNORE_PATH = ['/api/login'];

@Middleware()
export class JSONMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const _res = await next();
      const result: IResposeOptions = {
        code: 0,
        message: 'success',
        data: _res,
      };

      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'json';
  }

  ignore(ctx: Context): boolean {
    const path = ctx.path;
    const isIgnore = !path.startsWith('/api/') || IGNORE_PATH.includes(path);
    return isIgnore;
  }
}
