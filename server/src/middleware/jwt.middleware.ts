// src/middleware/jwt.middleware.ts

import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/koa';

const IGNORE_PATH = ['/auth/login', '/auth/captcha'];

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  ignore(ctx: Context): boolean {
    const path = ctx.path;
    const isIgnore = IGNORE_PATH.includes(path);
    return isIgnore;
  }
}
