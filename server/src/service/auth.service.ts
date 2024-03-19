import { Inject, MidwayHttpError, Provide } from '@midwayjs/core';
import { LoginDTO } from '../dto/login';
import { JwtService } from '@midwayjs/jwt';
import { prisma } from '../prisma';
import { USER_WHIT_PASSWORD_NOT_MATCHED } from '../utils/network';
import { omit } from 'lodash';

// 权限服务
@Provide()
export class AuthService {
  @Inject()
  jwt: JwtService;

  async login(loginInfo: LoginDTO) {
    const { name, password } = loginInfo;
    const current = await prisma.user.findUnique({
      where: {
        name,
        password,
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
        ...omit(current, ['password', 'createdAt', 'updatedAt']),
        token,
      };
    } else {
      // 用户不存在或密码错误
      throw new MidwayHttpError(
        '用户不存在或密码错误',
        USER_WHIT_PASSWORD_NOT_MATCHED
      );
    }
  }
}
