import { Context, Inject } from '@midwayjs/core';
import { IResult, Result } from '../utils/result';
import { QueryInfoDTO } from '../dto/query';
import { BaseService } from './base.service';

export abstract class BaseController<T extends BaseService> {
  @Inject()
  ctx: Context;

  service: T;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }

  async page(query: QueryInfoDTO) {
    const data = await this.service.page(query);
    return this.success(data);
  }
}
