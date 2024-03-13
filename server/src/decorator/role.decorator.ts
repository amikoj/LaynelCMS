import { savePropertyMetadata } from '@midwayjs/core';

export const ROLE_META_KEY = 'role:name';

export function Role(roleName: string | string[]): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    roleName = [].concat(roleName);
    // 只保存元数据
    savePropertyMetadata(ROLE_META_KEY, roleName, target, propertyKey);
  };
}
