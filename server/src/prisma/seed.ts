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
  {
    id: 4,
    name: '潦草屋',
    desc: '潦草屋前端web',
    code: 'liaocaowu',
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
    sort: 1,
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
    sort: 99,
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
    sort: 1,
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
    sort: 2,
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
    sort: 3,
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
    sort: 4,
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
    icon: 'majesticons:article-line',
    title: '文章管理',
    sort: 2,
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
    pid: 7,
    title: '文章列表',
    sort: 1,
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
    pid: 7,
    title: '文章分类',
    sort: 2,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 10,
    name: 'Topic',
    path: '/topic',
    component: 'LAYOUT',
    redirect: '/topic/list',
    type: 0,
    sort: 3,
    icon: 'ph:text-columns-fill',
    title: '专题管理',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 11,
    name: 'TopicList',
    path: '/topic/list',
    component: '/system/topic/index',
    type: 1,
    title: '专题列表',
    pid: 10,
    sort: 1,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 12,
    name: 'TopicSubscription',
    path: '/topic/subscription',
    component: '/system/topic/subscription',
    type: 1,
    title: '专题订阅',
    pid: 10,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 13,
    name: 'Softwate',
    path: '/software',
    component: 'Layout',
    icon: 'bi:palette-fill',
    type: 0,
    title: '软件管理',
    sort: 5,
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 14,
    name: 'SoftwateList',
    path: '/software/list',
    component: '/system/software/index',
    type: 1,
    title: '软件列表',
    sort: 1,
    pid: 13,
    roles: {
      connect: [{ id: 1 }],
    },
  },
];

const platforms = [
  {
    id: 1,
    name: 'PC',
    desc: '桌面Web端，适用于大页面展示',
  },
  {
    id: 2,
    name: 'H5',
    desc: 'H5端页面',
  },
  {
    id: 3,
    name: '小程序',
    desc: '小程序端页面',
  },
  {
    id: 4,
    name: 'App',
    desc: 'App端页面',
  },
];

const softwares = [
  {
    name: '技术博客',
    code: 'blog',
    icon: '',
    desc: '记录技术时刻，一款技术人员的老头乐。',
    status: 1,
    author: {
      connect: { id: 1 },
    },
    sort: 1,
    roles: {
      connect: [{ id: 4 }],
    },
    platforms: {
      connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
  },
  {
    name: '电子书',
    code: 'e-book',
    icon: '',
    desc: '满足白嫖电子书的需求.',
    status: 1,
    author: {
      connect: { id: 2 },
    },
    sort: 2,
    roles: {
      connect: [{ id: 4 }],
    },
    platforms: {
      connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
  },
  {
    name: 'FFmpeg 在线工具',
    code: 'ffmpeg',
    icon: '',
    desc: 'FFmpeg 在线工具.',
    status: 1,
    author: {
      connect: { id: 3 },
    },
    sort: 2,
    roles: {
      connect: [{ id: 4 }],
    },
    platforms: {
      connect: [{ id: 1 }],
    },
  },
];

export async function main() {
  console.log('---------seed.js 被执行--------');
  await prisma.role.deleteMany({});
  await prisma.software.deleteMany({});
  await prisma.softwarePlatform.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.permissions.deleteMany({});
  await prisma.menu.deleteMany({});

  await prisma.role.createMany({
    data: roles,
  });

  users.forEach(async (user: any) => await prisma.user.create({ data: user }));

  const createMenus = menus.map((data: any) => prisma.menu.create({ data }));
  const createPermission = permissions.map((data: any) =>
    prisma.permissions.create({ data })
  );

  const createPlatforms = platforms.map((data: any) =>
    prisma.softwarePlatform.create({ data })
  );

  const createSoftwares = softwares.map((data: any) =>
    prisma.software.create({ data })
  );

  // createMany创建多条数据不能创建关联关系
  await prisma.$transaction([
    // ...createRoles,
    // ...createUsers,
    ...createMenus,
    ...createPermission,
    ...createPlatforms,
    ...createSoftwares,
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
