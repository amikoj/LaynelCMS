import { Rule, RuleType } from '@midwayjs/validate';

export class loginDTO {
  @Rule(RuleType.string().required())
  captchaId: string;

  @Rule(RuleType.string().required())
  captcha: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  password: string;
}
