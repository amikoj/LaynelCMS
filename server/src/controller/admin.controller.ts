import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiExcludeController } from '@midwayjs/swagger';
import { AdminService } from '../service/admin.service';



@Controller('/admin')
@ApiExcludeController()
export class AdminController {
  @Inject()
  ctx: Context;


  @Inject()
  adminService: AdminService;


  @Get('/login')
  async login() {
    await this.adminService.render('login');
  }

  @Get('/')
  async dashborad() {
    await this.adminService.render('dashborad');
  }


  @Get('/*')
  async page() {
    const params = this.ctx.params
    console.log('get params:', params)
    await this.adminService.render(params['0'])
  }

}
