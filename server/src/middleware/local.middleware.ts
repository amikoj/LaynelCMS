// src/middleware/local.middleware.ts

import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';

@Middleware()
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  // 设置 AuthenticateOptions
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      failureRedirect: '/login',
    };
  }
}
