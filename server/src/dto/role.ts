// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class RoleDTO {
  id?: number;

  @Rule(RuleType.string().required())
  name: string;

  [key: string]: any;
}
