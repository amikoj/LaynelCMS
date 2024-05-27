import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';
import { SoftwareDTO } from '../dto/menu';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { Context } from '@midwayjs/koa';
@Provide()
export class SoftwareService {
  @Inject()
  ctx: Context;

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

  async getSoftware(id: number) {
    if (id) {
      const current = await prisma.software.findUnique({
        where: {
          id,
        },
      });
      return current;
    }
    throw new MidwayHttpError('软件id不能为空！', VAILDATE_PARAMS_NOT_MATCHED);
  }

  async addSoftware(software: SoftwareDTO) {
    software.author = {
      connect: {
        id: this.ctx.state?.user?.id,
      },
    };

    if (software.platforms)
      software.platforms = {
        connect: software.platforms.map((id: any) => {
          return {
            id,
          };
        }),
      };

    return await prisma.software.create({
      data: {
        ...software,
      },
    });
  }

  async updateSoftware(software: SoftwareDTO) {
    if (!software.id)
      throw new MidwayHttpError('ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      if (software.platforms) {
        software.platforms = {
          set: software.platforms.map((id: any) => {
            return {
              id,
            };
          }),
        };
      }

      const current = await prisma.software.update({
        where: {
          id: software.id,
        },
        data: { ...(software as any) },
      });

      return current;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  async delSoftware(id: number) {
    try {
      const result = await prisma.software.findUnique({
        where: {
          id,
        },
        include: {
          platforms: true,
        },
      });
      if (result && result.platforms?.length > 0) {
        const update = prisma.software.update({
          where: {
            id,
          },

          data: {
            platforms: {
              set: [],
            },
          },
        });

        const del = prisma.software.delete({
          where: {
            id,
          },
        });

        await prisma.$transaction([update, del]);
        return id;
      } else if (!result) {
        throw new MidwayHttpError('数据不存在', DATA_SET_NOT_EXIST);
      } else {
        // 角色表真删除
        await prisma.software.delete({
          where: { id },
        });
        return id;
      }
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }
}
