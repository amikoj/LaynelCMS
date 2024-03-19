import { MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { isNullOrUndefined } from '@midwayjs/core/dist/util/types';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';
import { omit } from 'lodash';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';

@Provide()
export class UserService {
  // 获取用户信息
  async getUser(user: UserDTO) {
    if (isNullOrUndefined(user) && Object.keys(user).length) return null;
    const current = await prisma.user.findFirst({
      where: {
        ...omit(user, ['password', 'roles']),
        isDeleted: false,
      },
    });
    return {
      ...omit(current, ['password', 'createdAt', 'updatedAt']),
    };
  }

  // 新增用户信息
  async addUser(user: UserDTO) {
    const data = {
      ...omit(user, ['roles', 'password', 'id']),
    };

    if (user.roles) {
      // 连接现有数据
      data.roles = {
        connect: user.roles.split(',').map((id: any) => {
          return {
            id: Number(id),
          };
        }),
      };
    }
    try {
      return await prisma.user.create({
        data,
        include: {
          roles: !!data.roles,
        },
      });
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  // 新增多条用户信息
  async addUsers(users: UserDTO[]) {
    return await prisma.user.createMany({
      data: [...users],
      skipDuplicates: true,
    });
  }

  // 列表查询
  async list(query: QueryInfoDTO) {
    const { page = 1, limit = 15, ...options } = query;
    const result = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...options,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    console.log('get result:', result);
    return result;
  }

  // 更新
  async updateUser(user: UserDTO) {
    if (!user.id)
      throw new MidwayHttpError('用户ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);
    const data = {
      ...omit(user, ['roles', 'password', 'id']),
    };

    // 连接现有数据
    data.roles = {
      set: user.roles
        ? user.roles.split(',').map((id: any) => {
            return {
              id: Number(id),
            };
          })
        : [],
    };
    try {
      return await prisma.user.update({
        where: {
          id: user?.id,
          isDeleted: false,
        },
        data,
        include: {
          roles: true,
        },
      });
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  // 删除
  async delUser(id: number) {
    try {
      const current = await prisma.user.findUnique({
        where: {
          id,
          isDeleted: false,
        },
        include: {
          posts: true,
        },
      });

      if (!current)
        throw new MidwayHttpError('当前用户不存在', DATA_SET_NOT_EXIST);

      if (current.posts && current.posts.length)
        throw new MidwayHttpError(
          '该用户有关联文章存在，无法删除，请先迁移文章关联或直接删除文章后重写操作！',
          OPERATOR_WITH_RELATION
        );
      return await prisma.user.update({
        where: {
          id,
          isDeleted: false,
        },
        data: {
          isDeleted: true,
          roles: {
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
}
