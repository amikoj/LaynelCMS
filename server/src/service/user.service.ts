import { Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { isNullOrUndefined } from '@midwayjs/core/dist/util/types';
import { UserDTO } from '../dto/user';
import { QueryInfoDTO } from '../dto/query';

@Provide()
export class UserService {
  // 获取用户信息
  async getUser(id: number) {
    if (isNullOrUndefined(id)) return null;

    const current = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log('get current user:', current);
    return current;
  }

  // 新增用户信息
  async addUser(user: UserDTO) {
    return await prisma.user.create({
      data: {
        ...user,
      },
    });
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
    console.log('get query:', query)
    const result = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...options,
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
    return await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: { ...user },
    });
  }

  // 删除
  async delUser(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
