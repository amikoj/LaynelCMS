import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

// init data

// 初始化角色
const roles = [
    {
        id: 1,
        "name": "系统管理员",
        "desc": "系统管理员"
    }, {
        id: 2,
        "name": "管理员",
        "desc": "后台管理员"
    }, {
        id: 3,
        "name": "运维",
        "desc": "运维人员"
    }
]

// 初始化数据
const users = [
    {
        "email": "hfcaidev@gmail.com",
        "name": "admin",
        "nick": "管理员",
        "age": 1,
        "gender": 1,
        roles: {
            connect: [{ id: 1 }]
        },
        "password": "2BC68D71FC41C028",
    }, {
        "email": "1710600212@qq.com",
        "name": "cai",
        "nick": "胖蔡",
        "age": 1,
        "gender": 1,
        "roles": {
            connect: [{ id: 1 }, { id: 2 }]
        },
        "password": "2BC68D71FC41C028",
    },
]



async function main() {

    await prisma.role.deleteMany({})
    await prisma.user.deleteMany({})


    // 创建默认角色
    await prisma.role.createMany({
        data: roles,
    })


     // createMany创建多条数据不能创建关联关系
    await prisma.$transaction(users.map((user: any) => prisma.user.create({data: user})))

}


main().then((res: any) => {
    console.log('---------初始化数据成功--------')
}).catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
        await prisma.$disconnect();
    });