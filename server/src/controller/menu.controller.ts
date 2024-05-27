import {
  Body,
  Config,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CaptchaService } from '@midwayjs/captcha';
import { ApiBearerAuth, ApiTags } from '@midwayjs/swagger';
import { MenuService } from '../service/menu.service';
import { QueryInfoDTO } from '../dto/query';
import { MenuDTO } from '../dto/menu';
import { RuleType, Valid } from '@midwayjs/validate';

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

  @Put('/')
  async add(@Body() menu: MenuDTO) {
    return await this.menuService.addMenu(menu);
  }

  @Post('/')
  async update(@Body() menu: MenuDTO) {
    return await this.menuService.updateMenu(menu);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.menuService.delMenu(id);
  }
}
