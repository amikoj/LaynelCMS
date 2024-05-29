import { Context, Inject, Post, Provide } from '@midwayjs/core';
import { IResult, Result } from '../utils/result';
import { QueryInfoDTO } from '../dto/query';
import { BaseService } from './base.service';

@Provide()
export abstract class BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  baseService: BaseService;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }

  @Post('/page')
  async page(query: QueryInfoDTO) {
    const data = await this.baseService.page(query);
    return await this.success(data);
  }
}
