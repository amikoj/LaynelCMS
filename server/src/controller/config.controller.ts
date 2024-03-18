import {
  Controller,
  Post,
  IConfigurationOptions,
  Body,
  Config,
  Get,
} from '@midwayjs/core';

// 系统服务动态更新
@Controller('/config')
export class ConfigController {
  @Config('view')
  config;

  @Post('/update')
  async updateConfig(@Body() body: IConfigurationOptions) {
    // 返回成功响应
    return {
      code: 200,
      message: 'Config updated successfully',
    };
  }

  @Get('/')
  async getConfig() {
    return this.config || {};
  }
}
