import { Application, Framework } from "@midwayjs/koa"
import { createApp,close, createHttpRequest } from "@midwayjs/mock";


describe('/test/controller/role.test.ts',() => {
    let app: Application;

    beforeAll(async () => {
        app =  await createApp<Framework>();
    })

    afterAll(async () => {
        await close(app);
    })

    it('should test /api/role/page with success request', async () => {
        const result =  (await createHttpRequest(app).post('/api/role/page')).body({page:1});
        expect(result.code).toBe(0)
    })

    it('should test /api/role/page with fail request', async () => {
        const result =  (await createHttpRequest(app).post('/api/role/page')).body({page:1});
        expect(result.code).toBe(401)
    })
})