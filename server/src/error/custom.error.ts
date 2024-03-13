import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

// 自定义异常错误
export class CustomHttpError extends MidwayHttpError {
  constructor() {
    super('my custom error', HttpStatus.BAD_REQUEST);
  }
}
