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

  async menu() {
    // console.log('get ctx:', this.ctx.state);
    return [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: 'LAYOUT',
        redirect: '/dashboard/analysis',
        meta: {
          title: 'routes.dashboard.dashboard',
          hideChildrenInMenu: true,
          icon: 'bx:bx-home',
        },
      },
      {
        path: '/system',
        name: 'System',
        component: 'LAYOUT',
        redirect: '/system/account',
        meta: {
          icon: 'ion:settings-outline',
          title: 'routes.demo.system.moduleName',
        },
        children: [
          {
            path: 'account',
            name: 'AccountManagement',
            meta: {
              title: 'routes.demo.system.account',
              ignoreKeepAlive: true,
            },
            component: '/demo/system/account/index',
          },
          {
            path: 'account_detail/:id',
            name: 'AccountDetail',
            meta: {
              hideMenu: true,
              title: 'routes.demo.system.account_detail',
              ignoreKeepAlive: true,
              showMenu: false,
              currentActiveMenu: '/system/account',
            },
            component: '/demo/system/account/AccountDetail',
          },
          {
            path: 'role',
            name: 'RoleManagement',
            meta: {
              title: 'routes.demo.system.role',
              ignoreKeepAlive: true,
            },
            component: '/demo/system/role/index',
          },
          {
            path: 'menu',
            name: 'MenuManagement',
            meta: {
              title: 'routes.demo.system.menu',
              ignoreKeepAlive: true,
            },
            component: '/demo/system/menu/index',
          },
          {
            path: 'dept',
            name: 'DeptManagement',
            meta: {
              title: 'routes.demo.system.dept',
              ignoreKeepAlive: true,
            },
            component: '/demo/system/dept/index',
          },
          {
            path: 'changePassword',
            name: 'ChangePassword',
            meta: {
              title: 'routes.demo.system.password',
              ignoreKeepAlive: true,
            },
            component: '/demo/system/password/index',
          },
        ],
      },
    ];
  }
}
