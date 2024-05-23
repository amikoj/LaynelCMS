import { Inject, Provide } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { prisma } from '../prisma';
import { Context } from '@midwayjs/koa';
import { QueryInfoDTO } from '../dto/query';

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
      },
    });

    return this.transferMenu(permissions);
  }
}
