import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiExcludeController } from '@midwayjs/swagger';

@ApiExcludeController()
@Controller('/')
export class WebController {
  @Inject()
  ctx: Context;

  @Get('/')
  async render() {
    await this.ctx.render('default/home', {
      data: [
        {
          title: '计算机基础知识',
          chapts: [
            {
              title: '',
              href: '',
            },
          ],
        },
      ],
    });
  }
}
