
import os
from typing import Dict
from fastapi import APIRouter, FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from ..config import BaseConfig, ModuleInfo, RouteInfo

themeRouter = APIRouter(prefix="/", tags=["主题"])
templates: Jinja2Templates = None


def renderFunc(route: RouteInfo) -> function:
    scripts = ''
    if route.component:
        scripts = f'<script type="module" src="/static/js/{route.component}.js"></script>'
    ctx: Dict = {
        "title": route.title,
        "scripts": scripts,
        "icon": route.icon,
        "route": route,
        'context': {}
    }
    
    def render(request: Request):
        ctx['request'] = request
        return templates.TemplateResponse(route.path, context=ctx)
    return render


def redirect_to(url: str):
    def redirect(request: Request):
        return RedirectResponse(url)
    return redirect
    
def load_per_route(route: RouteInfo):
    
    if route.children and route.children.__len__() > 0:
        for child in route.children:
            load_per_route(child)
        if route.redirect:
            themeRouter.get(route.url, name=route.name, response_class=HTMLResponse)(redirect_to(route.redirect))     
    else:
        themeRouter.get(route.url, name=route.name, response_class=HTMLResponse)(renderFunc(route))

def  load_routes(app: FastAPI):
    config = app.state.config  # type: BaseConfig
    theme = config.theme # type: ModuleInfo
    
    if not theme:
        return
    global templates
    templates = Jinja2Templates(directory=os.path.join(theme.path, "pages"))
    app.mount(f"/{theme.name}/static", StaticFiles(directory="public"), name=f"f{theme.name}_static")
    
    # 加载主题路由
    for route in theme.pages:
        load_per_route(route)
    app.include_router(themeRouter) # 注册主题路由
    

__all__ = ["themeRouter", "load_routes"]