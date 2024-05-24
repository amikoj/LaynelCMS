// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 菜单类型
 */
export enum MenuTypeEnum {
  DIR = 0,
  PAGE = 1,
  BUTTON = 2,
}

export class MenuDTO {
  id?: number;

  @Rule(RuleType.string().required())
  name: string;

  path?: string;

  @Rule(RuleType.number().required())
  type: MenuTypeEnum;

  status = true; // 默认启用

  icon?: string;

  redirect?: string;

  @Rule(RuleType.string().required())
  title: string;
  isLink?: boolean;
  component = 'Layout';
  pid?: number;
  sort?: number;
  desc?: string;

  [key: string]: any;
}
