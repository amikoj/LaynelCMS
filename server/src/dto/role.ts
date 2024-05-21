// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export enum RoleStatusEnum {
  ACTIVE = 1,
  DEACTIVE = 2,
}

export class RoleDTO {
  id?: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  code: string;

  sort?: number;

  @Rule(RuleType.number().required())
  status: RoleStatusEnum;

  desc?: string;

  [key: string]: any;
}
