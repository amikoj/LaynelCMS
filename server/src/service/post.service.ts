import { Inject, MidwayHttpError } from '@midwayjs/core';
import { prisma } from '../prisma';
import { QueryInfoDTO } from '../dto/query';
import {
  DATA_SET_NOT_EXIST,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { Context } from '@midwayjs/koa';
import { CategoryDTO, PostDTO } from '../dto/post';
import { BaseService } from '../base/base.service';
import { db } from '../decorator/prisma.decorator';

@db('post')
export class PostService extends BaseService {
  @Inject()
  ctx: Context;

  getQueryPage(query: QueryInfoDTO) {
    const { title } = query;
    return {
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
    };
  }

  async catePage(query: QueryInfoDTO) {
    const { page = 1, pageSize = 15 } = query;
    const result = await this.getPaginatedWithCount(
      {
        page,
        pageSize,
        orderBy: {
          updatedAt: 'asc',
        },
      },
      'category'
    );

    return this.success(result);
  }

  async catelist() {
    const list = await prisma.category.findMany({});
    return this.success(this.listToTree(list, 'id', 'pid'));
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

  async addCate(cate: CategoryDTO) {
    const result = await prisma.category.create({
      data: {
        name: cate.name,
        desc: cate.desc,
        pid: cate.pid,
      },
    });

    return this.success(result);
  }

  async updateCate(cate: CategoryDTO) {
    try {
      const result = await prisma.category.update({
        where: {
          id: cate.id,
        },
        data: {
          ...cate,
        },
      });

      return this.success(result);
    } catch {
      return this.error('当前分类不存在');
    }
  }

  async delCate(cate: CategoryDTO) {
    try {

      const a = await prisma.category.findUnique({
        where: {
          id: cate.id,
        },
        include: {
          cate
        }
      })




      await prisma.post.update({
        where: {
          // categories: {
          //   some: {
          //     id: cate.id,
          //   },
          // },
        },
        data: {
          categories: {
            set: [],
          },
        },
      });
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
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
