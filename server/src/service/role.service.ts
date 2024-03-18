import { MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { isNullOrUndefined } from '@midwayjs/core/dist/util/types';
import { RoleDTO } from '../dto/role';
import { QueryInfoDTO } from '../dto/query';
import { omit } from 'lodash';
import { VAILDATE_PARAMS_NOT_MATCHED } from '../utils/network';

@Provide()
export class RoleService {
  // 获取角色信息
  async getRole(role: RoleDTO) {
    if (isNullOrUndefined(role) && Object.keys(role).length) return null;

    const current = await prisma.role.findFirst({
      where: {
        ...role,
      },
    });
    return {
      ...omit(current, ['createdAt', 'updatedAt']),
    };
  }

  // 新增用户信息
  async addRole(role: RoleDTO) {
    return await prisma.role.create({
      data: {
        ...(omit(role, ['id']) as RoleDTO),
      },
    });
  }

  // 新增多条用户信息
  async addRoles(roles: RoleDTO[]) {
    return await prisma.user.createMany({
      data: [...roles],
      skipDuplicates: true,
    });
  }

  // 列表查询
  async list(query: QueryInfoDTO) {
    const { page = 1, limit = 15, ...options } = query;
    console.log('get query:', query);
    const result = await prisma.role.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...options,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return result;
  }

  // 更新
  async updateRole(role: RoleDTO) {
    if (!role.id)
      throw new MidwayHttpError('角色ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);
    return await prisma.role.update({
      where: {
        id: role?.id,
      },
      data: { ...role },
    });
  }

  // 删除
  async delRole(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
