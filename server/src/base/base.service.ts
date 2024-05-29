import { Inject, Provide } from '@midwayjs/core';
import { QueryInfoDTO } from '../dto/query';
import { Context } from '@midwayjs/koa';
import { prisma } from '../prisma';

@Provide()
export abstract class BaseService {


  @Inject()
  ctx: Context;


  table: string;

  constructor() {
    console.log('get baseservice:', this)
  }


  async page(query: QueryInfoDTO) {

    if(!this.table) return null
    const { page = 1, pageSize = 15 } = query;

    // prisma.$queryRaw

    const result = await prisma[this.table]?.findMany({
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
