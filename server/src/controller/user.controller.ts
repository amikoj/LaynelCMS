import {
  Inject,
  Controller,
  Get,
  Query,
  Body,
  Post,
  Put,
  Del,
  MidwayHttpError,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';
import { ApiTags } from '@midwayjs/swagger';
import { RuleType, Valid } from '@midwayjs/validate';
import { VAILDATE_PARAMS_NOT_MATCHED } from '../utils/network';

@ApiTags(['user'])
@Controller('/api/user')
export class UserController {
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
    return await this.userService.getUser({ id } as UserDTO);
  }

  @Put('/')
  async add(@Body() user: UserDTO) {
    return await this.userService.addUser(user);
  }

  @Post('/')
  async update(@Body() user: UserDTO) {
    return await this.userService.updateUser(user);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    if (id === 1)
      throw new MidwayHttpError(
        'admin用户不可操作',
        VAILDATE_PARAMS_NOT_MATCHED
      );
    return await this.userService.delUser(id);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.userService.list(query);
  }
}
