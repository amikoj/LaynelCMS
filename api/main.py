from fastapi import FastAPI
from .routes import users

app =  FastAPI()

def load_routes(app):
    '''
    加载所有路由
    '''
    app.include_router(users.router, prefix="/users", tags=["用户管理"])
    
load_routes(app) # 加载路由


if __name__ == '__main__':
    ''' 
    启动服务, 监听8000端口
    '''
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", reload=True) # 启动服务