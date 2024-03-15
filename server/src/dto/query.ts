import { Rule, RuleType } from '@midwayjs/validate';

/**
 * @description 列表分页查询
 */
export class QueryInfoDTO {
  @Rule(RuleType.number().min(1))
  page: number;

  @Rule(RuleType.number().min(1).max(200))
  limit: number;

  [key: string]: any
}
