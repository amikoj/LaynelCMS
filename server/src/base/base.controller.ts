import { Body, Context, Inject, Post, Provide } from '@midwayjs/core';
import { IResult, Result } from '../utils/result';
import { QueryInfoDTO } from '../dto/query';
import { BaseService } from './base.service';

@Provide()
export abstract class BaseController<T extends BaseService> {
  @Inject()
  ctx: Context;

  @Inject()
  service: T;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }

  @Post('/page')
  async page(@Body() query: QueryInfoDTO) {
    const data = await this.service.page(query);
    return await this.success(data);
  }
}
