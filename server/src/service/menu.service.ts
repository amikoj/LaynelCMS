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
        path: current.path,
        component: current.component,
        name: current.name,
        redirect: current.redirect,
        meta: {
          title: current.title,
          icon: current.icon,
          showMenu: !current.hidden,
          hideMenu: current.hidden,
        },
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
    const { page = 1, pageSize = 15, name = '', status } = query;
    const permissions = await prisma.permissions.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        type: 1,
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

    return permissions;
  }
}
