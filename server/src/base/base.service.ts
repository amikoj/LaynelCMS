import { QueryInfoDTO } from '../dto/query';
import { Context } from '@midwayjs/koa';
import { prisma } from '../prisma';
import { Inject } from '@midwayjs/core';
import { IResult, Page, Result } from '../utils/result';
import { omit } from 'lodash';

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

    if (query.include) queryInfo.include = query.include;
    if (query.orderBy) queryInfo.orderBy = query.orderBy;

    return queryInfo;
  }

  /**
   * 获取分页数据
   * @param query  sql查询对象
   * @param table 操作的table名称
   * @returns 返回
   */
  async getPaginatedWithCount(
    query: any,
    table: string,
    format = (result: any) => result
  ) {
    const { page = 1, pageSize = 15, ...queryInfo } = query;

    const list = await prisma[table]?.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...queryInfo,
    });

    const total = await prisma[table]?.count(omit(queryInfo, ['include']));
    return {
      list: format(list),
      total,
    };
  }

  async page(query: QueryInfoDTO) {
    if (!this.table) return this.error(`${this.table}名不能为空！`);
    const queryInfo: any = this.getQueryPage(query);
    return this.success<Page>(
      await this.getPaginatedWithCount(queryInfo, this.table, this.formatPage)
    );
  }

  getlistQuery(query: QueryInfoDTO): any {
    return {
      orderBy: {
        createdAt: 'desc',
      },
    };
  }

  async list(query?: QueryInfoDTO) {
    const list = await prisma[this.table]?.findMany({
      ...this.getlistQuery(query),
    });
    return this.success(list);
  }
}
