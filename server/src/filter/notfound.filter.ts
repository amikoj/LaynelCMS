import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    console.log('get MidwayHttpError:', err);
    // 404 错误会到这里
    // ctx.redirect('/404.html');
    ctx.logger.error(err);
    return {
      code: 404,
      message: `无法找到${ctx.request.path}请求地址`,
      data: null,
    };
  }
}
