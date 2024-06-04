import { MidwayHttpError } from '@midwayjs/core';
import { prisma } from '../prisma';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';
import { omit } from 'lodash';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { BaseService } from '../base/base.service';
import { db } from '../decorator/prisma.decorator';

@db('user')
export class UserService extends BaseService {
  // 获取用户信息
  async getUser(user: UserDTO) {
    if (!user.id) user.name = this.ctx.state.user.name;
    const current = await prisma.user.findFirst({
      where: {
        ...omit(user, ['password', 'roles', 'isDeleted']),
        isDeleted: false,
      },
      include: {
        roles: true,
      },
    });

    const result = this.success({
      ...omit(current, ['password', 'createdAt', 'updatedAt', 'isDeleted']),
      roles: current.roles?.map((role: any) =>
        omit(role, ['createdAt', 'updatedAt'])
      ),
    });
    return this.success(result);
  }

  // 新增用户信息
  async addUser(user: UserDTO) {
    const data = {
      ...omit(user, ['roles', 'password', 'id']),
    };

    if (user.roles) {
      // 连接现有数据
      data.roles = {
        connect: user.roles.map((id: number) => {
          return {
            id,
          };
        }),
      };
    }
    try {
      return this.success(
        await prisma.user.create({
          data,
          include: {
            roles: !!data.roles,
          },
        })
      );
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  // 新增多条用户信息
  async addUsers(users: UserDTO[]) {
    return this.success(
      await prisma.user.createMany({
        data: [...users],
        skipDuplicates: true,
      })
    );
  }

  getQueryPage(query: QueryInfoDTO) {
    const { name = '', nick = '' } = query;

    return {
      where: {
        isDeleted: false,
        name: {
          contains: name,
        },
        nick: {
          contains: nick,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        nick: true,
        age: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        gender: true,
        email: true,
        roles: {
          select: {
            name: true,
            id: true,
          },
        },
        remark: true,
      },
    };
  }

  async getAllUsers() {
    const result = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        nick: true,
        avatar: true,
        email: true,
      },
    });
    return this.success(result);
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
      set: (user.roles ?? []).map((id: any) => {
        return { id };
      }),
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
      const result = await prisma.user.update({
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

      return this.success(result);
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }
}
