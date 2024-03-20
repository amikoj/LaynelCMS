import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiExcludeController } from '@midwayjs/swagger';

@ApiExcludeController()
@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async render() {
    console.log('get render------------');
    await this.ctx.render('default/home', {
      data: 'world',
    });
  }
}
