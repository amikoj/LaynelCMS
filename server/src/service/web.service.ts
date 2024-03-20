import { Inject, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { Context } from '@midwayjs/koa';

@Provide()
export class WebService {
  @Inject()
  ctx: Context;

  async config() {
    // 模板配置
    const configTemplate = await prisma.modules.findUnique({
      where: {
        id: 1,
      },
    });

    return {};
  }
}
