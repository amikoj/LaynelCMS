import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { Context } from '@midwayjs/koa';
import { SubscriptionTopicDTO, TopicDTO } from '../dto/Topic';
import { omit } from 'lodash';
import { BaseService } from '../base/base.service';
import { db } from '../decorator/prisma.decorator';


@Provide()
@db('topic')
export class TopicService extends BaseService{
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

  /**
   * 查询主题订阅列表
   * @param query
   */
  async subscribePage(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15, name } = query;

    const result = await prisma.subscriptionTopic.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        user: {
          name: {
            contains: name,
          },
        },
      },
    });
    return result || [];
  }

  async getTopic(id: number) {
    if (id) {
      const current = await prisma.topic.findUnique({
        where: {
          id,
        },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
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

  /**
   * 订阅专题
   * @param subscription 订阅信息
   * @returns Promise
   */
  async subscription(subscription: SubscriptionTopicDTO) {
    subscription.user = {
      connect: {
        id: this.ctx.state?.user?.id,
      },
    };

    subscription.topic = {
      connect: {
        id: subscription.topicId,
      },
    };

    return await prisma.subscriptionTopic.create({
      data: {
        ...(subscription as any),
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

  async cancelSubscription(id: number) {
    try {
      const result = await prisma.subscriptionTopic.findUnique({
        where: {
          id,
        },
      });

      if (!result)
        throw new MidwayHttpError('当前数据不存在', DATA_SET_NOT_EXIST);

      const subscription = omit(result, [
        'id',
        '',
      ]) as unknown as SubscriptionTopicDTO;

      subscription.user = {
        connect: {
          id: this.ctx.state?.user?.id,
        },
      };

      subscription.topic = {
        connect: {
          id: subscription.topicId,
        },
      };

      return await prisma.subscriptionTopic.create({
        data: {
          ...(subscription as any),
          status: 2,
        },
      });
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }
}
