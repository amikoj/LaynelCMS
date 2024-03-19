import {
  Inject,
  Controller,
  Get,
  Query,
  Body,
  Post,
  Put,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RuleType, Valid } from '@midwayjs/validate';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';
import { RoleService } from '../service/role.service';
import { RoleDTO } from '../dto/role';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags(['role'])
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
  async add(@Body() role: RoleDTO) {
    return await this.roleService.addRole(role);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.roleService.delRole(id);
  }

  @Post('/')
  async update(@Body() role: RoleDTO) {
    return await this.roleService.updateRole(role);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.roleService.list(query);
  }
}
