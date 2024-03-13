import { Guard, IGuard, getPropertyMetadata } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ROLE_META_KEY } from '../decorator/role.decorator';

@Guard()
export class AuthGuard implements IGuard<Context> {
  // 于在请求中验证是否可以访问后续的方法，当返回 true 时，后续的方法会被执行，当 canActivate 返回 false 时，会抛出 403 错误码。
  async canActivate(
    context: Context,
    supplierClz,
    methodName: string
  ): Promise<boolean> {
    const roleNameList = getPropertyMetadata<string[]>(
      ROLE_META_KEY,
      supplierClz,
      methodName
    );

    if (roleNameList && roleNameList.length && context.user.role) {
      // 假设中间件已经拿到了用户角色信息，保存到了 context.user.role 中
      // 直接判断是否包含该角色
      return roleNameList.includes(context.user.role);
    }

    return false;
  }
}
