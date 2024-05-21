import { MidwayHttpError, Provide } from '@midwayjs/core';
import { prisma } from '../prisma';
import { isNullOrUndefined } from '@midwayjs/core/dist/util/types';
import { RoleDTO, RoleStatusEnum } from '../dto/role';
import { QueryInfoDTO } from '../dto/query';
import { omit } from 'lodash';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';

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

  async list() {
    const result = await prisma.role.findMany({
      where: {
        status: RoleStatusEnum.ACTIVE,
      },
      select: {
        id: true,
        name: true,
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

    try {
      const current = await prisma.role.update({
        where: {
          id: role?.id,
        },
        data: { ...role },
      });

      return current;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  // 删除
  async delRole(id: number) {
    try {
      const result = await prisma.role.findUnique({
        where: {
          id,
        },
        include: {
          users: true,
        },
      });
      if (result && result.users?.length > 0) {
        console.log('当前角色已关联用户，请先删除角色下的用户');
        throw new MidwayHttpError(
          '当前角色已关联用户，请先删除角色下的用户',
          OPERATOR_WITH_RELATION
        );
      } else if (!result) {
        throw new MidwayHttpError('角色不存在', DATA_SET_NOT_EXIST);
      } else {
        // 角色表真删除
        await prisma.role.delete({
          where: { id },
        });
        return {};
      }
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }
}
