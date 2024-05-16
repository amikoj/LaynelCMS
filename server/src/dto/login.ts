import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

/**
 * @description 登录dto
 */
export class LoginDTO {
  @ApiProperty({ example: 'Kitty', description: '验证码ID' })
  @Rule(RuleType.string())
  captchaId?: string;
  @ApiProperty({ example: 'Kitty', description: '验证码' })
  @Rule(RuleType.string())
  captcha?: string;
  @ApiProperty({ example: 'Kitty', description: '用户名' })
  @Rule(RuleType.string().required())
  username: string;
  @ApiProperty({ example: '123456', description: '密码' })
  @Rule(RuleType.string().required())
  password: string;
}
