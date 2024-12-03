from fastapi import FastAPI, APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/admin", tags=["后端管理系统"])

templates = Jinja2Templates(directory="templates")

# 注册静态文件目录
router.mount("/static", StaticFiles(directory="public"), name="static")

@router.get("/")
async def admin_index(request: Request):
    """后台管理系统首页"""
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/login")
async def admin_login(request: Request):
    """后台管理系统登录页"""
    return templates.TemplateResponse("login.html", {"request": request})

async def admin_users(request: Request):
    """后台管理系统用户管理页"""
    return templates.TemplateResponse("user/index.html", {"request": request})

async def admin_roles(request: Request):
    """后台管理系统角色管理页"""
    return templates.TemplateResponse("role/index.html", {"request": request})


async def admin_plugins(request: Request):
    """后台管理系统插件管理页"""
    return templates.TemplateResponse("plugin/index.html", {"request": request})

def init_app(app: FastAPI):
    app.include_router(router)
    pass



__all__ = ["init_app"]