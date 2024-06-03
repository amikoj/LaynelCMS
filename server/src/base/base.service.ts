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

  formatPage<T>(list: T[]): any[] {
    return list;
  }

  getQueryPage(query: QueryInfoDTO): any {
    const queryInfo: any = {
      orderBy: {
        createdAt: 'desc',
      },
    };

    if (query.includes) queryInfo.includes = query.includes;
    if (query.orderBy) queryInfo.orderBy = query.orderBy;

    return queryInfo;
  }

  async getPaginatedWithCount(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15 } = query;

    const queryInfo: any = this.getQueryPage(query);

    const list = await prisma[this.table]?.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...queryInfo,
    });

    const total = await prisma[this.table]?.count(queryInfo);
    return {
      list: this.formatPage(list),
      total,
    };
  }

  async page(query: QueryInfoDTO) {
    if (!this.table) return this.error(`${this.table}名不能为空！`);
    return this.success<Page>(await this.getPaginatedWithCount(query));
  }

  getlistQuery(query: QueryInfoDTO): any {
    return {
      ...query,
      orderBy: {
        createdAt: 'desc',
      },
    };
  }

  async list(query: QueryInfoDTO) {
    const list = await prisma[this.table]?.findMany({
      ...this.getlistQuery(query),
    });
    return this.success(list);
  }
}
