import { Body, Del, Get, Inject, Post, Put, Query } from '@midwayjs/core';
import { ApiTags } from '@midwayjs/swagger';
import { SoftwareDTO } from '../dto/menu';
import { QueryInfoDTO } from '../dto/query';
import { RuleType, Valid } from '@midwayjs/validate';
import { TopicService } from '../service/topic.service';
import { SubscriptionTopicDTO, TopicDTO } from '../dto/Topic';
import { BaseController } from '../base/base.controller';
import { LaynelController } from '../decorator/laynel.decorator';

@ApiTags(['topic'])
@LaynelController({
  prefix: '/topic',
  methods: [],
})
export class TopicController extends BaseController {
  @Inject()
  topicService: TopicService;

  @Inject()
  service: TopicService;

  @Get('/')
  async getTopic(@Query('id') id: number) {
    return await this.topicService.getTopic(id);
  }

  @Put('/')
  async add(@Body() topic: TopicDTO) {
    return await this.topicService.addTopic(topic);
  }

  async update(@Body() topic: SoftwareDTO) {
    return await this.topicService.updateTopic(topic);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO): Promise<any> {
    return await super.page(query);
  }

  @Post('/subscription/page')
  async subscribePage(@Body() query: QueryInfoDTO) {
    return await this.topicService.subscribePage(query);
  }

  @Post('/subscription/apply')
  async subscription(@Body() subscription: SubscriptionTopicDTO) {
    return await this.topicService.subscription(subscription);
  }

  @Post('/subscription/cancel')
  async cancleSubscription(@Body() id: number) {
    return await this.topicService.cancelSubscription(id);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.topicService.delTopic(id);
  }
}