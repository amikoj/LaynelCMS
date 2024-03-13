import { createRequestParamDecorator } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

// 创建一个token的装饰器
export const Token = () => {
  return createRequestParamDecorator((ctx: Context) => {
    return ctx.headers?.token;
  });
};
