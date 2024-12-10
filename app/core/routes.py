
import os
import json
from fastapi import APIRouter, Depends, Request, FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .dependencies import plugin_dependencies
from .config import AppInfo

__routes__ = []  # 路由列表
router = APIRouter(prefix="/admin", tags=["后端管理系统"])
templates: Jinja2Templates = Jinja2Templates(directory="templates")


@router.get("/")
async def index(request: Request, context: dict = Depends(plugin_dependencies)): 
    '''需要判断是否登录，控制进入login页面还是后台管理系统首页
    '''
    return templates.TemplateResponse("index.html", {"request": request, "context": context})


@router.get("/login")
async def login(request: Request):
    # 登录页面
    return RedirectResponse('/dashboard')


class RouterInfo:
    def __init__(self, app: FastAPI, name:str, path:str, title:str, icon:str, redirect:str = None, component:str = None, children:list = None):
        self.app: FastAPI = app
        self.name: str = name
        self.title: str = title
        self.icon: str = icon
        self.path: str = path
        self.component: str = component
        self.redirect: str = redirect
        self.children: list = children
        self.templates: Jinja2Templates = templates
        
        self.register()
        
    def redirect_to(self, url):
        '''
        重定向到指定url
        '''
        def redirect(request: Request):
            return RedirectResponse(url)
        return redirect
    
    def render(self, request: Request, context = Depends(plugin_dependencies)):
        '''
        渲染页面
        '''
        scripts = ''
        if self.component:
            scripts = f'<script src="/static/js/{self.component}.js"></script>'
        ctx: dict = {
            'request': request, 
            'context': context, 
            'title': self.title, 
            'icon': self.icon,
            'scripts': scripts
        }
        return self.templates.TemplateResponse('index.html', context=ctx)
        
    def __repr__(self) -> str:
        return f'<RouterInfo {self.name}>'
    
    def register(self):
        '''
        注册路由信息
        '''
        if self.children and self.children.__len__() > 0:
            # 子路由
            routes = []
            for child in self.children:
                child_route = RouterInfo(app=self.app, **child)    # 递归注册子路由
                routes.append(child_route)
            self.children = routes
            if self.redirect:
                # 重定向到子路由
                router.get(self.path, response_class=HTMLResponse, operation_id=self.name, name=self.title)(self.redirect_to(self.children[0].path))
        else:
            # 非子路由
            router.get(self.path, response_class=HTMLResponse, operation_id=self.name, name=self.title)(self.render)



def init_app(app: FastAPI):
    """
    初始化后台管理系统路由服务
    """
    

def load_routes(app: FastAPI):
    '''
    加载后台管理系统路由
    '''
    # 注册静态文件目录
    app.mount("/static", StaticFiles(directory="public"), name="static")
    routes_file = os.path.join('app', 'routes.json')
    if os.path.exists(routes_file):
        with open(routes_file, 'r') as f:
            routes = json.load(f)
            print('get routes from routes.json', routes)
            for r in routes:
                route = RouterInfo(app=app,**r)
                __routes__.append(route)
    app.include_router(router)   # 加载路由 
                
                
__all__ = ['load_routes', '__routes__', 'router', 'templates', 'RouterInfo']