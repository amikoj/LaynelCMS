// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  id?: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().min(0).max(999))
  age: number;

  @Rule(RuleType.number().max(2).min(1))
  gender: number;

  password?: string;

  [key: string]: any;
}
