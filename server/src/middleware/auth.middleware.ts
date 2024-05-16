import { Middleware, IMiddleware, Inject, httpError } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

const IGNORE_PATH = ['/admin/login'];

// 接口访问权限认证中间件
@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log('get Context:', ctx);
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }

      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          //token过期 生成新的token
          // const newToken = getToken(user);
          // //将新token放入Authorization中返回给前端
          // ctx.set('Authorization', newToken);
        }
      }

      // 中间件拦截
      await next();
    };
  }

  ignore(ctx: Context): boolean {
    const path = ctx.path;
    return IGNORE_PATH.includes(path);
  }

  static getName(): string {
    return 'auth';
  }
}
