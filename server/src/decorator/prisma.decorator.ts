import {
  Provide,
  saveClassMetadata,
  saveModule,
  Scope,
  ScopeEnum,
} from '@midwayjs/core';

export const DB_TABLE_KEY = 'decorator:prisma_table_key';

export function db(key?: string): ClassDecorator {
  return (target: any) => {
    target.prototype.table = key;

    saveModule(DB_TABLE_KEY, target);
    saveClassMetadata(DB_TABLE_KEY, { table: key }, target);
    Scope(ScopeEnum.Request)(target);
    Provide()(target);
  };
}
