from fastapi import FastAPI
from .routes import users

app =  FastAPI()

def load_routes(app):
    '''
    加载所有路由
    '''
    app.include_router(users.router, prefix="/users", tags=["用户管理"])
    
load_routes(app) # 加载路由


