import { Inject, Provide } from '@midwayjs/core';
import { QueryInfoDTO } from '../dto/query';
import { Context } from '@midwayjs/koa';
import { prisma } from '../prisma';

@Provide()
export abstract class BaseService {
  @Inject()
  ctx: Context;
  async page(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15 } = query;

    const result = await prisma.software.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        sort: 'asc',
      },
      include: {
        roles: true,
        platforms: true,
      },
    });
    return result;
  }
}
