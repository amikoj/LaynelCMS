import { Context, Inject } from '@midwayjs/core';
import { IResult, Result } from '../utils/result';
import { QueryInfoDTO } from '../dto/query';
import { BaseService } from './base.service';

export abstract class BaseController {
  @Inject()
  ctx: Context;

  service: BaseService;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }

  async page(query: QueryInfoDTO) {
    return await this.service.page(query);
  }
}
