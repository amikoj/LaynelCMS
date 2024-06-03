import { MidwayHttpError } from '@midwayjs/core';
import { prisma } from '../prisma';
import { isNullOrUndefined } from '@midwayjs/core/dist/util/types';
import { RoleDTO, RoleStatusEnum } from '../dto/role';
import { omit } from 'lodash';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { BaseService } from '../base/base.service';
import { db } from '../decorator/prisma.decorator';
import { QueryInfoDTO } from '../dto/query';

@db('role')
export class RoleService extends BaseService {
  // 获取角色信息
  async getRole(role: RoleDTO) {
    if (isNullOrUndefined(role) && Object.keys(role).length) return null;

    const current = await prisma.role.findFirst({
      where: {
        ...role,
      },
      include: {
        permissions: {
          select: {
            id: true,
          },
        },
      },
    });

    const target: any = {
      ...omit(current, ['createdAt', 'updatedAt']),
    };

    target.permissions = target.permissions.map((item: any) => item.id);

    return this.success(target);
  }

  // 新增用户信息
  async addRole(role: RoleDTO) {
    const data: any = {
      ...(omit(role, ['id']) as RoleDTO),
    };

    if (data.permissions && data.permissions.length) {
      data.permissions = {
        connect: data.permissions.map((id: any) => {
          return { id };
        }),
      };
    }
    const result = await prisma.role.create({
      data,
    });
    return this.success(result);
  }

  // 新增多条用户信息
  async addRoles(roles: RoleDTO[]) {
    return this.success(
      await prisma.user.createMany({
        data: [...roles],
        skipDuplicates: true,
      })
    );
  }

  getlistQuery(query: QueryInfoDTO) {
    return {
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
    };
  }

  // 更新
  async updateRole(role: RoleDTO) {
    if (!role.id)
      throw new MidwayHttpError('角色ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      const data = role;
      if (role.permissions && role.permissions.length) {
        data.permissions = {
          set: role.permissions.map((id: any) => {
            return { id };
          }),
        };
      }
      const current = await prisma.role.update({
        where: {
          id: role?.id,
        },
        data,
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

  async enable(data: any) {
    if (!data.id)
      throw new MidwayHttpError('角色ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      const current = await prisma.role.update({
        where: {
          id: data?.id,
        },
        data: {
          status: data.status,
        },
        select: {
          id: true,
        },
      });
      return current.id;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }
}
