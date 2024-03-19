import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiExcludeController } from '@midwayjs/swagger';

@Controller('/admin')
@ApiExcludeController()
export class AdminController {
  @Inject()
  ctx: Context;

  @Get('/login')
  async login() {
    await this.ctx.render('login', {
      data: 'world',
    });
  }
}
