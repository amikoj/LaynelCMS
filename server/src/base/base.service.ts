import { QueryInfoDTO } from '../dto/query';
import { Context } from '@midwayjs/koa';
import { prisma } from '../prisma';
import { Inject } from '@midwayjs/core';
import { IResult, Page, Result } from '../utils/result';

export abstract class BaseService {
  @Inject()
  ctx: Context;
  table: string;

  success<T>(data?: T, option: IResult<T> = {}): IResult<T> {
    return Result.success<T>({ data, ...option });
  }
  error(message?, option: IResult = {}) {
    return Result.error({ message, ...option });
  }

  async getPaginatedWithCount(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15 } = query;

    const queryInfo: any = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    };

    if (query.includes) queryInfo.includes = query.includes;
    if (query.orderBy) queryInfo.orderBy = query.orderBy;
    const list = await prisma[this.table]?.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...queryInfo,
    });

    const total = await prisma[this.table]?.count(queryInfo);
    return {
      list,
      total,
    };
  }

  async page(query: QueryInfoDTO) {
    // console.log('get baseservice page:', this.table, this.ctx);
    if (!this.table) return null;
    return this.success<Page>(await this.getPaginatedWithCount(query));
  }
}
