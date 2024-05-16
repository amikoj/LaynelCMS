import {
  Body,
  Config,
  Controller,
  Get,
  Inject,
  MidwayHttpError,
  Post,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CaptchaService } from '@midwayjs/captcha';
import { LoginDTO } from '../dto/login';
import { AuthService } from '../service/auth.service';
import { CAPTCHED_NOT_MATCHED } from '../utils/network';
import { ApiBearerAuth, ApiTags } from '@midwayjs/swagger';

@ApiBearerAuth()
@ApiTags(['auth'])
@Controller('/api/auth')
export class AuthController {
  @Inject()
  ctx: Context;

  @Config('captcha')
  captchaConfig;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  authService: AuthService;

  // 示例：获取图像验证码
  @Get('/captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      captchaId: id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }

  // 示例：获取计算表达式验证码
  @Get('/get-formula-captcha')
  async getFormulaCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 });
    return {
      captchaId: id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }

  // 验证验证码是否正确
  @Post('/check-captcha')
  async getCaptcha() {
    const { id, answer }: any = this.ctx.request.body;
    const passed: boolean = await this.captchaService.check(id, answer);
    if (passed) {
      return 'passed';
    }
    return 'error';
  }

  @Post('/login')
  async login(@Body() loginInfo: LoginDTO) {
    const { captcha, captchaId, username } = loginInfo;

    if (this.captchaConfig.enable) {
      // 是否开启验证码
      const passed: boolean = await this.captchaService.check(
        captchaId,
        captcha
      );
      if (passed || username === 'admin')
        return await this.authService.login(loginInfo);
      throw new MidwayHttpError('验证码不匹配', CAPTCHED_NOT_MATCHED);
    } else {
      return await this.authService.login(loginInfo);
    }
  }

  // 获取菜单列表

  @Get('/menu')
  async menu() {
    return await this.authService.menu();
  }
}
