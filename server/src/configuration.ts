import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import * as captcha from '@midwayjs/captcha';
import * as view from '@midwayjs/view-ejs';
import * as staticFile from '@midwayjs/static-file';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { JSONMiddleware } from './middleware/json.middleware';
// import { AuthMiddleware } from './middleware/auth.middleware';
import { InternalServerErrorFilter } from './filter/internal.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { DefaultErrorFilter } from './filter/default.filter';

@Configuration({
  imports: [
    koa,
    view, // 导入ejs模板引擎
    validate,
    jwt,
    captcha,
    staticFile,
    {
      component: info, // 启用的组件
      enabledEnvironment: ['local'], // 组件启用的环境
    },
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JSONMiddleware]);
    // this.app.getMiddleware().insertLast(AuthMiddleware);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      DefaultErrorFilter,
      InternalServerErrorFilter,
    ]);
  }
}
