import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { Context } from '@midwayjs/koa';
import { TopicDTO } from '../dto/Topic';
@Provide()
export class TopicService {
  @Inject()
  ctx: Context;

  /**
   * topic列表查询
   * @param query  查询条件
   * @returns Promise
   */
  async page(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15, name } = query;

    const result = await prisma.topic.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        sort: 'asc',
      },
      where: {
        name: {
          contains: name,
        },
      },
    });
    return result;
  }

  async getTopic(id: number) {
    if (id) {
      const current = await prisma.topic.findUnique({
        where: {
          id,
        },
        include: {
          creator: true,
        },
      });
      return current;
    }
    throw new MidwayHttpError('id不能为空！', VAILDATE_PARAMS_NOT_MATCHED);
  }

  async addTopic(topic: TopicDTO) {
    topic.creator = {
      connect: {
        id: this.ctx.state?.user?.id,
      },
    };

    return await prisma.software.create({
      data: {
        ...(topic as any),
      },
    });
  }

  async updateTopic(topic: TopicDTO) {
    if (!topic.id)
      throw new MidwayHttpError('ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      const current = await prisma.topic.update({
        where: {
          id: topic.id,
        },
        data: { ...(topic as any) },
      });

      return current;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  async delTopic(id: number) {
    try {
      const result = await prisma.topic.findUnique({
        where: {
          id,
        },
        include: {
          posts: true,
          SubscriptionTopic: true,
        },
      });
      if (result && result.posts?.length > 0) {
        throw new MidwayHttpError(
          '当前专题已绑定文章，请先解绑',
          OPERATOR_WITH_RELATION
        );
      } else if (result && result.SubscriptionTopic?.length > 0) {
        throw new MidwayHttpError(
          '当前专题已被订阅，无法删除',
          OPERATOR_WITH_RELATION
        );
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
