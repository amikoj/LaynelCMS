import { Controller, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags(['role'])
@Controller('/template')
export class TemplateController {
  @Inject()
  ctx: Context;
}
