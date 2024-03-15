// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().min(0).max(999))
  age: number;

  @Rule(RuleType.number().max(2).min(1))
  gender: number;

  [key: string]: any;
}
