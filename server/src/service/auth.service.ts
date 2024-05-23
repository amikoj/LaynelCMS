import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { LoginDTO } from '../dto/login';
import { JwtService } from '@midwayjs/jwt';
import { prisma } from '../prisma';
import { USER_WHIT_PASSWORD_NOT_MATCHED } from '../utils/network';
import { omit } from 'lodash';
import { Context } from '@midwayjs/koa';

// 权限服务
@Provide()
export class AuthService {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  async login(loginInfo: LoginDTO) {
    const { username, password } = loginInfo;
    const current = await prisma.user.findUnique({
      where: {
        name: username,
        password,
      },
      include: {
        roles: true,
      },
    });
    if (current) {
      // 登录成功
      const token = await this.jwt.sign({
        id: current.id,
        name: current.name,
        nick: current.nick,
        roles: current.roles.map((role: any) => role.id),
      });

      return {
        ...omit(current, ['password', 'createdAt', 'updatedAt', 'isDeleted']),
        token,
        roles: current.roles.map((item: any) =>
          omit(item, ['createdAt', 'updatedAt'])
        ),
      };
    } else {
      // 用户不存在或密码错误
      throw new MidwayHttpError(
        '用户不存在或密码错误',
        USER_WHIT_PASSWORD_NOT_MATCHED
      );
    }
  }

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
        // if (menu.hidden)
        //   map[menu.id].meta.currentActiveMenu = map[menu.pid]?.path;
        (map[menu.pid].children ??= []).push(map[menu.id]);
      }
    });
    return target;
  }

  async menu() {
    const permissions = await prisma.permissions.findMany({
      where: {
        type: {
          not: 2,
        },
        roles: {
          some: {
            id: {
              in: this.ctx.state.user.roles,
            },
          },
        },
        status: true,
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

    // console.log('get permissions:', this.transferMenu(permissions));

    return this.transferMenu(permissions);
  }
}
