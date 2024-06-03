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
import { QueryInfoDTO } from '../dto/query';
import { RoleService } from '../service/role.service';
import { RoleDTO } from '../dto/role';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags(['role'])
@Controller('/role')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  service: RoleService;

  /**
   * @description 获取当前用户信息
   * @param id  用户id
   * @returns 当前用户
   */
  @Get('/')
  async getRole(@Query('id') id: number) {
    return await this.service.getRole({ id } as RoleDTO);
  }

  @Put('/')
  async add(@Body() role: RoleDTO) {
    return await this.service.addRole(role);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.service.delRole(id);
  }

  @Post('/')
  async update(@Body() role: RoleDTO) {
    return await this.service.updateRole(role);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.service.page(query);
  }

  @Get('/list')
  async list() {
    return await this.service.list();
  }

  /**
   * 修改角色状态
   * @param data { status: number, id: number} status: 1:
   */
  @Post('/enable')
  async enable(@Body() data: { status: number; id: number }) {
    return await this.service.enable(data);
  }
}
