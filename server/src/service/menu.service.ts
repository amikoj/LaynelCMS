import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { prisma } from '../prisma';
import { Context } from '@midwayjs/koa';
import { QueryInfoDTO } from '../dto/query';
import { MenuDTO } from '../dto/menu';
import {
  DATA_SET_NOT_EXIST,
  OPERATOR_WITH_RELATION,
  VAILDATE_PARAMS_NOT_MATCHED,
} from '../utils/network';
import { omit } from 'lodash';

// 权限服务
@Provide()
export class MenuService {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  transferMenu(menus: any[]) {
    const map = menus.reduce((target: any, current: any) => {
      target[current.id] = {
        ...current,
      };
      return target;
    }, {});
    const target: any[] = [];

    menus.forEach((menu: any) => {
      if (menu.pid === null) target.push(map[menu.id]);
      else {
        (map[menu.pid].children ??= []).push(map[menu.id]);
      }
    });
    return target;
  }

  async menu(query: QueryInfoDTO) {
    const { name = '', status } = query;
    const permissions = await prisma.permissions.findMany({
      where: {
        name: {
          contains: name,
        },
        status,
      },
      orderBy: {
        sort: 'asc',
      },
      select: {
        name: true,
        id: true,
        pid: true,
        component: true,
        icon: true,
        redirect: true,
        path: true,
        title: true,
        hidden: true,
        status: true,
        type: true,
        createdAt: true,
        isLink: true,
        sort: true,
        keepalive: true,
      },
    });

    return this.transferMenu(permissions);
  }

  async getMenu(menu: MenuDTO) {
    if (menu.id) {
      const current = await prisma.permissions.findUnique({
        where: {
          id: menu.id,
        },
      });
      return current;
    }
    throw new MidwayHttpError('菜单id不能为空！', VAILDATE_PARAMS_NOT_MATCHED);
  }

  async addMenu(menu: MenuDTO) {
    return await prisma.permissions.create({
      data: {
        ...(omit(menu, ['id']) as any),
      },
    });
  }

  async updateMenu(menu: MenuDTO) {
    if (!menu.id)
      throw new MidwayHttpError('菜单ID不能为空', VAILDATE_PARAMS_NOT_MATCHED);

    try {
      const current = await prisma.permissions.update({
        where: {
          id: menu.id,
        },
        data: { ...(menu as any) },
      });

      return current;
    } catch (err: any) {
      throw new MidwayHttpError(
        err.message ?? '当前数据不存在',
        err.code ?? DATA_SET_NOT_EXIST
      );
    }
  }

  async delMenu(id: number) {
    try {
      const result = await prisma.permissions.findUnique({
        where: {
          id,
        },
        include: {
          roles: true,
        },
      });
      if (result && result.roles?.length > 0) {
        console.log('当前菜单已关联角色，请先删除角色关联关系');
        throw new MidwayHttpError(
          '当前菜单已关联角色，请先删除角色关联关系',
          OPERATOR_WITH_RELATION
        );
      } else if (!result) {
        throw new MidwayHttpError('菜单不存在', DATA_SET_NOT_EXIST);
      } else {
        // 角色表真删除
        await prisma.permissions.delete({
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
