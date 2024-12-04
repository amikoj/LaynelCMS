from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import json
from .core import plugin_dependencies

router = APIRouter(prefix="/admin", tags=["后端管理系统"])

templates = Jinja2Templates(directory="templates")






def load_routes():
    '''
    加载后台管理系统路由
    '''
    current_dir = os.path.relpath(os.path.dirname(os.path.abspath(__file__)), os.getcwd())

    routes_file = os.path.join(current_dir, 'routes.json')
    if os.path.exists(routes_file):
        with open(routes_file, 'r') as f:
            routes = json.load(f)
            print('get routes from routes.json', routes)
            for route in routes:
                print('add route', route)
            




load_routes()




# 注册静态文件目录
router.mount("/static", StaticFiles(directory="public"), name="static")

@router.get("/")
async def admin_index(request: Request, context: dict = Depends(plugin_dependencies)): 
    """后台管理系统首页"""
    return templates.TemplateResponse("index.html", {"request": request, "context": context})

@router.get("/login")
async def admin_login(request: Request, context: dict = Depends(plugin_dependencies)):
    """后台管理系统登录页"""
    return templates.TemplateResponse("login.html", {"request": request})

async def admin_users(request: Request, context: dict = Depends(plugin_dependencies)):
    """后台管理系统用户管理页"""
    return templates.TemplateResponse("user/index.html", {"request": request})

async def admin_roles(request: Request, context: dict = Depends(plugin_dependencies)):
    """后台管理系统角色管理页"""
    return templates.TemplateResponse("role/index.html", {"request": request})


async def admin_plugins(request: Request, context: dict = Depends(plugin_dependencies)):
    """后台管理系统插件管理页"""
    return templates.TemplateResponse("plugin/index.html", {"request": request})

def init_app(app: FastAPI):
    app.include_router(router)
    pass


__all__ = ["init_app"]