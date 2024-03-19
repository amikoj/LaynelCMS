import { Aspect, IMethodAspect, JoinPoint } from '@midwayjs/core';
import { HomeController } from '../controller/web.controller';

@Aspect(HomeController)
export class ReportInfo implements IMethodAspect {
  async before(point: JoinPoint) {
    console.log('before home router run');
  }
}
