import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiTags } from '@midwayjs/swagger';
import { SoftwareService } from '../service/software.service';
import { SoftwareDTO } from '../dto/menu';
import { QueryInfoDTO } from '../dto/query';
import { RuleType, Valid } from '@midwayjs/validate';

@ApiTags(['software'])
@Controller('/software')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  softwareService: SoftwareService;

  @Get('/')
  async getSoftware(@Query('id') id: number) {
    return await this.softwareService.getSoftware(id);
  }

  @Put('/')
  async add(@Body() software: SoftwareDTO) {
    return await this.softwareService.addSoftware(software);
  }

  async update(@Body() software: SoftwareDTO) {
    return await this.softwareService.updateSoftware(software);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.softwareService.page(query);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.softwareService.delSoftware(id);
  }
}
