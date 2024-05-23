import { Body, Config, Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CaptchaService } from '@midwayjs/captcha';
import { ApiBearerAuth, ApiTags } from '@midwayjs/swagger';
import { MenuService } from '../service/menu.service';
import { QueryInfoDTO } from '../dto/query';

@ApiBearerAuth()
@ApiTags(['menu'])
@Controller('/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Config('captcha')
  captchaConfig;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  menuService: MenuService;

  // 获取菜单列表

  @Get('/page')
  async menu(@Body() query: QueryInfoDTO) {
    return await this.menuService.menu(query);
  }
}
