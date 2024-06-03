import { Body, Del, Get, Inject, Post, Put, Query } from '@midwayjs/core';
import { QueryInfoDTO } from '../dto/query';
import { RuleType, Valid } from '@midwayjs/validate';
import { PostService } from '../service/post.service';
import { PostDTO } from '../dto/post';
import { BaseController } from '../base/base.controller';
import { LaynelController } from '../decorator/laynel.decorator';

@LaynelController({
  prefix: '/article',
})
export class PostController extends BaseController {
  @Inject()
  service: PostService;

  @Get('/')
  async getSoftware(@Query('id') id: number) {
    return await this.service.getPost(id);
  }

  @Put('/')
  async add(@Body() post: PostDTO) {
    return await this.service.addPost(post);
  }

  async update(@Body() post: PostDTO) {
    return await this.service.updatePost(post);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return super.page(query);
  }

  @Post('/category/page')
  async catePage(@Body() query: QueryInfoDTO) {
    return super.catePage(query);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.service.delPost(id);
  }
}
