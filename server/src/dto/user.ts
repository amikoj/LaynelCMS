// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  id?: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(
    RuleType.number().min(0).max(999).message('年龄取值不合法，取值范围：0~999')
  )
  age: number;

  @Rule(
    RuleType.number()
      .max(2)
      .min(1)
      .message('性别取值不合法，取值范围：1 男 2 女')
  )
  gender: number;

  @Rule(
    RuleType.string()
      .pattern(/^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+[.a-zA-Z]+$/)
      .message('邮件格式不正确')
  )
  email: string;

  password?: string;

  [key: string]: any;

  roles?: string; // 使用,分割好连接多个角色id
}
