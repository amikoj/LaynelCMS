import { Catch, MidwayHttpError } from '@midwayjs/core';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError) {
    // 所有的未分类错误会到这里
    console.log('get err:', String(err));
    return {
      code: err.code ?? '500',
      message: String(err.message ?? err.name),
    };
  }
}
