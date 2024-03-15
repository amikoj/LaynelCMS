import { Provide } from '@midwayjs/core';
import { loginDTO } from '../dto/login';

// 权限服务
@Provide()
export class AuthService {
  async login(loginInfo: loginDTO) {
    return {};
  }
}
