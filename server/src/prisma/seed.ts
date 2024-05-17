import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// init data

// 初始化角色
const roles = [
  {
    id: 1,
    name: '系统管理员',
    desc: '系统管理员',
  },
  {
    id: 2,
    name: '管理员',
    desc: '后台管理员',
  },
  {
    id: 3,
    name: '运维',
    desc: '运维人员',
  },
];

// 初始化数据
const users = [
  {
    // email: 'hfcaidev@gmail.com',
    name: 'admin',
    nick: '管理员',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }],
    },
    password: 'Aa111111', // Aa111111
    avatar: '',
  },
  {
    // email: '1710600212@qq.com',
    name: 'cai',
    nick: '胖蔡',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }, { id: 2 }],
    },
    password: 'Aa111111',
    avatar: '',
  },
  {
    // email: '1710600212@qq.com',
    name: 'test',
    nick: 'test',
    age: 1,
    gender: 1,
    roles: {
      connect: [{ id: 1 }, { id: 2 }],
    },
    password: 'Aa111111',
    avatar: '',
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
    type: 1,
    title: '仪表盘',
    icon: 'bx:bx-home',
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
    type: 1,
    title: '系统管理',
    icon: 'ion:settings-outline',
    roles: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 3,
    name: 'AccountManagement',
    path: '/system/account',
    component: '/demo/system/account/index',
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
    component: '/demo/system/role/index',
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
    component: '/demo/system/menu/index',
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
    component: '/demo/system/account/AccountDetail',
    type: 1,
    title: '用户详情',
    pid: 2,
    roles: {
      connect: [{ id: 1 }],
    },
  },
];

export async function main() {
  console.log('---------seed.js 被执行--------');
  await prisma.role.deleteMany({});
  await prisma.user.deleteMany({});

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
