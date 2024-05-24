import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// init data

// 初始化角色
const roles = [
  {
    id: 1,
    name: '系统管理员',
    desc: '系统管理员',
    code: 'admin',
    sort: 1,
    status: 1,
  },
  {
    id: 2,
    name: '管理员',
    desc: '后台管理员',
    code: 'system',
    sort: 2,
    status: 1,
  },
  {
    id: 3,
    name: '运维',
    desc: '运维人员',
    code: 'operation',
    sort: 1,
    status: 1,
  },
];

// 初始化数据
const users = [
  {
    id: 1,
    email: 'hfcaidev@gmail.com',
    name: 'admin',
    nick: '管理员',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }],
    },
    password: 'Aa111111', // Aa111111
    avatar: '',
    remark: '超级管理员',
  },
  {
    id: 2,
    email: '1710600212@qq.com',
    name: 'cai',
    nick: '胖蔡',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }, { id: 2 }],
    },
    password: 'Aa111111',
    avatar: '',
    remark: '测试用户',
  },
  {
    id: 3,
    email: '1710600212@qq.com',
    name: 'test',
    nick: 'test',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }, { id: 2 }],
    },
    password: 'Aa111111',
    avatar: '',
    remark: '测试用户2',
  },
];

const menus = [
  {
    name: '后端管理系统',
    type: 1, // 后台管理系统
    desc: '后台管理系统配置的菜单列表',
  },
  {
    name: '潦草屋',
    type: 2, // 前端页面
    desc: '潦草屋前台网站的导航信息',
  },
];

const permissions = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    component: '/dashboard/analysis/index',
    type: 0,
    icon: 'bx:bx-home',
    title: '仪表盘',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 2,
    name: 'System',
    path: '/system',
    component: 'LAYOUT',
    redirect: '/system/account',
    type: 0,
    icon: 'ion:settings-outline',
    title: '系统管理',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 3,
    name: 'AccountManagement',
    path: '/system/account',
    component: '/system/account/index',
    type: 1,
    title: '用户管理',
    pid: 2,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 4,
    name: 'RoleManagement',
    path: '/system/role',
    component: '/system/role/index',
    type: 1,
    title: '角色管理',
    pid: 2,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 5,
    name: 'MenuManagement',
    path: '/system/menu',
    component: '/system/menu/index',
    type: 1,
    title: '菜单管理',
    pid: 2,
    roles: {
      connect: [{ id: 1 }],
    },
  },

  {
    id: 6,
    name: 'AccountDetail',
    path: '/system/account_detail/:id',
    component: '/system/account/AccountDetail',
    type: 1,
    title: '用户详情',
    pid: 2,
    hidden: true,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 7,
    name: 'Article',
    path: '/article',
    component: 'LAYOUT',
    redirect: '/article/list',
    type: 0,
    icon: 'ion:ios-bookmarks-outline',
    title: '文章管理',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 8,
    name: 'ArticleList',
    path: '/article/list',
    component: '/system/article/index',
    type: 1,
    title: '文章列表',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 9,
    name: 'ArticleCategory',
    path: '/article/list',
    component: '/system/article/category',
    type: 1,
    title: '文章分类',
    roles: {
      connect: [{ id: 1 }],
    },
  },
];

export async function main() {
  console.log('---------seed.js 被执行--------');
  await prisma.role.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.permissions.deleteMany({});
  await prisma.menu.deleteMany({});

  // 创建默认角色
  // await prisma.role.createMany({ data: roles });
  // await prisma.user.createMany({ data: users });

  const createRoles = roles.map((role: any) =>
    prisma.role.create({ data: role })
  );

  const createUsers = users.map((user: any) =>
    prisma.user.create({ data: user })
  );

  const createMenus = menus.map((data: any) => prisma.menu.create({ data }));
  const createPermission = permissions.map((data: any) =>
    prisma.permissions.create({ data })
  );
  // createMany创建多条数据不能创建关联关系
  await prisma.$transaction([
    ...createRoles,
    ...createUsers,
    ...createMenus,
    ...createPermission,
  ]);
}

main()
  .then((res: any) => {
    console.log('---------初始化数据成功--------', res);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
