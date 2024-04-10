import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import _ = require("lodash");


// 菜单类型
enum MenuType {
    DIR = 1,
    PAGE = 2,
}

// 路由
interface MenuItem {
    path: string,
    icon?: string, // icon路径
    title: string,
    parentId?: number,
    id: number,
    children?: MenuItem[],
    type: MenuType,
    redirect?: string, // 重定向
    extra?: boolean, // 非系统路由
}


interface ExtraData {
    menu: MenuItem[],
}


const whiteList = [
    'login'
]

// 后台管理系统
@Provide()
export class AdminService {


    @Inject()
    ctx: Context;
    data: ExtraData; // 默认配置数据
    menus: MenuItem[]; // flatArray,平铺菜单

    /**
     * 初始化加载数据
     */
    async initData() {

        this.data = {
            menu: await this.loadMenus()
        }
    }


    /**
     * 将一维数组转化为树状结构
     * @param menu 
     */
    transformTree(menus: MenuItem[]) {
        const map = _.keyBy(JSON.parse(JSON.stringify(menus)), 'id')
        menus.forEach((menu: MenuItem) => {
            if (map[menu.parentId]) {
              if(!map[menu.parentId].children)  map[menu.parentId].children = [menu]
              else map[menu.parentId].children.push(menu)

              delete map[menu.id]
        
            }
        })
        return Object.values(map)
    }


    /**
     * 加载所有菜单列表
     * @returns 返回所有菜单
     */
    async loadMenus(): Promise<MenuItem[]> {
        this.menus = [
            {
                path: 'dashborad',
                title: "主页",
                parentId: null,
                id: 1,
                type: MenuType.PAGE,
                icon:'icon-dashborad',
            }, {
                path: "article",
                title: "文章管理",
                id: 6,
                type: MenuType.PAGE,
                parentId: null,
                icon:'icon-icon_dashborad',
            }, {
                path: "plugin",
                title: "插件管理",
                id: 5,
                parentId: null,
                type: MenuType.PAGE,
                icon:'icon-plugin6',
            }, {
                path: "system",
                title: "系统管理",
                id: 2,
                parentId: null,
                type: MenuType.DIR,
                icon:'icon-icon-test16',
                redirect: 'system/users'
            }, {
                path: "system/users",
                title: "用户管理",
                id: 3,
                type: MenuType.PAGE,
                parentId: 2,
            }, {
                path: "system/settings",
                title: "设置",
                id: 4,
                type: MenuType.PAGE,
                parentId: 2,
            }
        ]

        return this.transformTree(this.menus)
    }


    /**
     * @param path 模版地址，和路由地址保持一致
     * @param options 额外配置信息
     * @returns 返回模板信息
     */
    async render(path: string, options: any = { }) {
        if (!this.data) await this.initData()

        options.path = path

        console.log('get menu:',this.data.menu)

        if(whiteList.includes(path)) 
        return await this.ctx.render(`admin/${path}`, { ...this.data, ...options })

        const target = this.menus.find((menu: MenuItem) => menu.path === path)
        if(target) {
            let currentPath = path
            if(target.redirect) currentPath = target.redirect
            const p = target.extra ? `pages/${currentPath}`:currentPath

            if(target.redirect) return await this.ctx.redirect(`/admin/${p}`)
            return await this.ctx.render(`admin/${p}`, { ...this.data, ...options });
        }
        return await this.ctx.render('admin/404', { ...this.data, ...options });
      
    }

    // 获取admin管理系统的动态路由
    async globMenu() {

    }


}