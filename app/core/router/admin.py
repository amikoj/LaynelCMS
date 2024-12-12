from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI

adminRouter = APIRouter(prefix="/admin", tags=["后端管理系统"])
templates: Jinja2Templates = Jinja2Templates(directory="templates")


@adminRouter.get("/")
async def index(request: Request, context: dict = Depends()): 
    '''需要判断是否登录，控制进入login页面还是后台管理系统首页
    '''
    return templates.TemplateResponse("index.html", {"request": request, "context": context})


@adminRouter.get("/login")
async def login(request: Request):
    # 登录页面
    return RedirectResponse('/dashboard')


def  load_routes(app: FastAPI):
    app.mount("/static", StaticFiles(directory="public"), name="static")
    pass



__all__ = ["adminRouter", "load_routers"]