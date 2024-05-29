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
import { QueryInfoDTO } from '../dto/query';
import { RuleType, Valid } from '@midwayjs/validate';
import { PostService } from '../service/post.service';
import { PostDTO } from '../dto/post';

@ApiTags(['article'])
@Controller('/article')
export class PostController {
  @Inject()
  ctx: Context;

  @Inject()
  postService: PostService;

  @Get('/')
  async getSoftware(@Query('id') id: number) {
    return await this.postService.getPost(id);
  }
 
  @Put('/')
  async add(@Body() post: PostDTO) {
    return await this.postService.addPost(post);
  }

  async update(@Body() post: PostDTO) {
    return await this.postService.updatePost(post);
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    return await this.postService.page(query);
  }

  @Del('/')
  async del(@Valid(RuleType.number().required()) @Body('id') id: number) {
    return await this.postService.delPost(id);
  }
}
