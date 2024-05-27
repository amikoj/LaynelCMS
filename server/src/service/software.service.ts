import { Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';

@Provide()
export class SoftwareService {
  /**
   * software列表查询
   * @param query  查询条件
   * @returns Promise
   */
  async page(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15 } = query;

    const result = await prisma.role.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        sort: 'asc',
      },
    });

    return result;
  }
}
