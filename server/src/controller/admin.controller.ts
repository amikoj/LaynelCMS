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
    await this.ctx.render('admin/login');
  }

  @Get('/')
  @Get('/dashborad')
  async dashborad() {
    await this.ctx.render('admin/dashborad');
  }

  /**
   * 用户管理
   */
  @Get('/system')
  @Get('/system/users')
  async userManager() {
    await this.ctx.render('admin/system/users');
  }

  @Get('/system/roles')
  async roleManager() {
    await this.ctx.render('admin/system/roles');
  }

  /**
   * 插件管理
   */
  @Get('/plugin')
  @Get('/plugin/index')
  async plugin() {
    await this.ctx.render('admin/plugin/index');
  }

  /**
   * 内容管理
   */
  @Get('/article')
  @Get('/article/index')
  async article() {
    await this.ctx.render('admin/article/index');
  }

  /**
   * web端菜单管理
   */
  @Get('/appearance')
  @Get('/appearance/menu')
  async menu() {
    await this.ctx.render('admin/appearance/menu');
  }

  /**
   * 小工具管理
   */
  @Get('/appearance/tool')
  async tool() {
    await this.ctx.render('admin/appearance/tool');
  }

  /**
   * 设置
   */
  @Get('/settings')
  @Get('/settings/normal')
  async normalSettings() {
    await this.ctx.render('admin/settings/normal');
  }
}
