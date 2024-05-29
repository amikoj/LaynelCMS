import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient({
    log: [{ level: 'query', emit: 'event' }]
});


prisma.$on('query', (event: any) => {
    console.log(' listenering sql query event:', event)
})