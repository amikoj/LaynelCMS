import {
  Inject,
  Controller,
  Get,
  Query,
  Body,
  Post,
  Put,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';
import { RoleService } from '../service/role.service';
import { RoleDTO } from '../dto/role';
import { VAILDATE_PARAMS_NOT_MATCHED } from '../utils/network';

@Controller('/api/role')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  /**
   * @description 获取当前用户信息
   * @param id  用户id
   * @returns 当前用户
   */
  @Get('/')
  async getRole(@Query('id') id: number) {
    return await this.roleService.getRole({ id } as UserDTO);
  }

  @Put('/')
  @Validate({
    errorStatus: VAILDATE_PARAMS_NOT_MATCHED,
  })
  async add(@Body() role: RoleDTO) {
    return await this.roleService.addRole(role);
  }

  @Post('/')
  @Validate({
    errorStatus: VAILDATE_PARAMS_NOT_MATCHED,
  })
  async update(@Body() role: RoleDTO) {
    return await this.roleService.updateRole(role);
  }

  @Post('/page')
  @Validate({
    errorStatus: 422,
  })
  async page(@Body() query: QueryInfoDTO) {
    return await this.roleService.list(query);
  }
}
