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
import { TopicService } from '../service/topic.service';

@ApiTags(['topic'])
@Controller('/topic')
export class TopicController {
  @Inject()
  ctx: Context;

  @Inject()
  topicService: TopicService;

  @Get('/')
  async getTopic(@Query('id') id: number) {
    return await this.topicService.getTopic(id);
  }

  @Put('/')
  async add(@Body() software: SoftwareDTO) {
    return await this.topicService.addTopic(software);
  }

  async update(@Body() software: SoftwareDTO) {
    return await this.topicService.updateTopic(software);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.topicService.page(query);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.topicService.delTopic(id);
  }
}
