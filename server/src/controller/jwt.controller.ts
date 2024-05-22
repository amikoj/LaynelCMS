import { Post, Inject, Controller } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { ApiTags } from '@midwayjs/swagger';

@ApiTags(['jwt'])
@Controller('/jwt')
export class JwtController {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post('/passport', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.state.user);
    return this.ctx.state.user;
  }

  @Post('/')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
