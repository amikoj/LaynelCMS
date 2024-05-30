import {
  Controller,
  Provide,
  saveClassMetadata,
  saveModule,
  Scope,
  ScopeEnum,
} from '@midwayjs/core';

export const DB_TABLE_KEY = 'decorator:prisma_table_key';

export interface LaynelConfig {
  prefix: string;
  methods?: string[];
}

export function LaynelController(config: LaynelConfig): ClassDecorator {
  return (target: any) => {
    console.log('get taget:', target);
    saveModule(DB_TABLE_KEY, target);
    saveClassMetadata(DB_TABLE_KEY, { table: config }, target);
    Scope(ScopeEnum.Request)(target);
    Provide()(target);
    Controller(config.prefix)(target);
  };
}
