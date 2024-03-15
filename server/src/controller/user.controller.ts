import { Inject, Controller, Get, Query, Body, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';

@Controller('/api/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  /**
   * @description 获取当前用户信息
   * @param id  用户id
   * @returns 当前用户
   */
  @Get('/')
  async getUser(@Query('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Post('/')
  @Validate({
    errorStatus: 422,
  })
  async add(@Body() user: UserDTO) {
    return await this.userService.addUser(user);
  }

  @Post('/page')
  @Validate({
    errorStatus: 422,
  })
  async page(@Body() query: QueryInfoDTO) {
    return await this.userService.list(query);
  }
}
