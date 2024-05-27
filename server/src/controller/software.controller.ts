import { Controller, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags(['software'])
@Controller('/software')
export class UserController {
  @Inject()
  ctx: Context;
}
