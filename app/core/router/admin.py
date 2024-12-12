from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI

admin = FastAPI(title="后台管理系统", description="后台管理系统", version="0.0.1")
templates: Jinja2Templates = Jinja2Templates(directory="templates")


@admin.get("/")
async def index(request: Request, context: dict = Depends()): 
    '''需要判断是否登录，控制进入login页面还是后台管理系统首页
    '''
    return templates.TemplateResponse("index.html", {"request": request, "context": context})


@admin.get("/login")
async def login(request: Request):
    # 登录页面
    return RedirectResponse('/dashboard')


def  load_routes(app: FastAPI):
    '''
    通过子应用挂载来加载后端服务路由，
    '''
    admin.mount("/static", StaticFiles(directory="public"), name="static")
    app.mount("/admin", admin)


__all__ = ["adminRouter", "load_routers"]