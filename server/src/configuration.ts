import {
  Configuration,
  App,
  MidwayWebRouterService,
  Inject,
} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import * as captcha from '@midwayjs/captcha';
import * as view from '@midwayjs/view-nunjucks';
import * as staticFile from '@midwayjs/static-file';
import * as passport from '@midwayjs/passport';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { JSONMiddleware } from './middleware/json.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
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
    passport,
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

  @Inject()
  webRouterService: MidwayWebRouterService;

  @Inject()
  env: view.NunjucksEnvironment;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JSONMiddleware]);
    this.app.getMiddleware().insertLast(JwtPassportMiddleware);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    // const list = this.webRouterService.getFlattenRouterTable();
    // console.log('get router list:', await list);
    this.env.addFilter('toString', (obj: any) => {
      const json = JSON.stringify(obj);
      console.log('get json:', json);
      return json;
    });
  }
}
