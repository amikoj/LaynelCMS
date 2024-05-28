import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';
import {
  DATA_SET_NOT_EXIST,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { Context } from '@midwayjs/koa';
import { PostDTO } from '../dto/post';
@Provide()
export class PostService {
  @Inject()
  ctx: Context;

  /**
   * 文章列表查询
   * @param query  查询条件
   * @returns Promise
   */
  async page(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15, title } = query;

    const result = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        sort: 'asc',
      },
      include: {
        author: true,
        categories: true,
      },
      where: {
        title: {
          contains: title,
        },
      },
    });
    return result;
  }

  async getPost(id: number) {
    if (id) {
      const current = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          categories: true,
          tags: true,
        },
      });
      return current;
    }
    throw new MidwayHttpError('id不能为空！', VAILDATE_PARAMS_NOT_MATCHED);
  }

  async addPost(article: PostDTO) {
    article.author = {
      connect: {
        id: this.ctx.state?.user?.id,
      },
    };

    if (article.categories)
      article.categories = {
        connect: article.categories.map((id: any) => {
          return {
            id,
          };
        }),
      };
    if (article.tags)
      article.tags = {
        connect: article.tags.map((id: any) => {
          return {
            id,
          };
        }),
      };

    return await prisma.post.create({
      data: {
        ...(article as any),
      },
    });
  }

  async updatePost(article: PostDTO) {
    if (!article.id)
      throw new MidwayHttpError('ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      if (article.categories) {
        article.categories = {
          set: article.categories.map((id: any) => {
            return {
              id,
            };
          }),
        };
      }

      if (article.tags) {
        article.categtagsories = {
          set: article.tags.map((id: any) => {
            return {
              id,
            };
          }),
        };
      }

      const current = await prisma.post.update({
        where: {
          id: article.id,
        },
        data: { ...(article as any) },
      });

      return current;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  async delPost(id: number) {
    try {
      const result = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
          tags: true,
        },
      });
      if (result && result.categories?.length > 0) {
        const update = prisma.post.update({
          where: {
            id,
          },

          data: {
            categories: {
              set: [],
            },
            tags: {
              set: [],
            },
          },
        });

        const del = prisma.post.delete({
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
