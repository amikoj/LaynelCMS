// src/strategy/local.strategy.ts

import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserService } from '../service/user.service';
import { Inject } from '@midwayjs/core';
// import { UserDTO } from '../dto/user';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  userService: UserService;

  // 策略的验证
  async validate(username, password) {
    // const user = await this.userService.getUser({ name: username } as UserDTO);
    if (await bcrypt.compare(password, 'user.password')) {
      throw new Error('error password ' + username);
    }

    return {
      username,
      password,
    };
  }

  // 当前策略的构造器参数
  getStrategyOptions(): any {
    return {};
  }
}
