from functools import lru_cache
import json
from typing import Callable, Dict, List
from fastapi import  Request
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI
from ..config import BaseConfig, get_config, RouteInfo, ModuleType,ModuleInfo

admin = FastAPI(title="后台管理系统", description="后台管理系统", version="0.0.1")
templates: Jinja2Templates = Jinja2Templates(directory="templates")
admin.mount("/static", StaticFiles(directory="dist"), name="main_static")


@admin.get("/", response_class=HTMLResponse)
async def index(request: Request): 
    '''需要判断是否登录，控制进入login页面还是后台管理系统首页
    '''
    return templates.TemplateResponse("index.html", {"request": request, "context": {
        "name":'main',
        'static': 'main_static'
    }})


@admin.get("/login")
async def login(request: Request):
    # 登录页面
    
    return RedirectResponse('/dashboard')


def redirect_to(url: str):
    def redirect(request: Request):
        return RedirectResponse(url)
    return redirect


def renderFunc(route: RouteInfo) -> Callable:
    scripts = ''
    if route.component:
        scripts = f'<script type="module" src="/static/js/{route.component}.js"></script>'
    ctx: Dict = {
        "title": route.title,
        "scripts": scripts,
        "icon": route.icon,
        'context': {}
    }
    
    def render(request: Request):
        ctx['request'] = request
        
        ctx['context'] = {
            "name": route.name,
            'static': route.plugin_name if route.plugin_name else 'main' + '_static',
            'route': route.model_dump_json(),
            'libs': get_main_libs_info()
        }
        return templates.TemplateResponse("index.html",  context=ctx)
    return render


def load_route(route: RouteInfo):
    if route.children and route.children.__len__() > 0:
        for child in route.children:
            load_route(child)
        if route.redirect:
            admin.get(route.url, name=route.name, response_class=HTMLResponse)(redirect_to(route.redirect))     
    else:
        admin.get(route.url, name=route.name, response_class=HTMLResponse)(renderFunc(route))




def  load_routes(app: FastAPI):
    '''
    通过子应用挂载来加载后端服务路由，
    '''
    app.mount("/admin", admin)
    config: BaseConfig = get_config()
    # 加载静态资源路由
    # 加载子应用静态资源路由
    for plugin in config.plugins:
        if plugin.enable and plugin.type == ModuleType.PLUGIN:
            # 加载插件静态资源路由
            admin.mount(f"/static/{plugin.name}", StaticFiles(directory=f"plugins/{plugin.name}/static"), name=f"{plugin.name}_static")
    # 加载后端管理系统路由
    routes = get_all_routes()
    for route in routes:
        load_route(route)
    print('get routes：', admin.routes)
    

# 内置后端管理系统路由配置
def get_static_routes():
    return [
        {
            
        }
    ]
    
@lru_cache(typed=False)   
def get_main_libs_info():
    chunksManifest = 'dist/.vite/manifest.json'
    with open(chunksManifest, 'r') as f:
        chunks = json.load(f)
    return chunks
    
def clear_main_libs_info_cache():
    get_main_libs_info.cache_clear()
    
    
def flat_routes(routes: List[RouteInfo], parent_name: str = None):
    '''
    扁平化路由列表
    '''
    result = []
    for route in routes:
        if parent_name:
            route.parent_name = parent_name
        result.append(route)
        if route.children:
            result.extend(flat_routes(route.children, route.name))
    return result
    
def  generate_admin_router(routes: List[RouteInfo]):
    '''
    生成后台管理系统路由【包含层级关系，且仅限用于导航存在路由】
    ''' 
    route_map: Dict[str, RouteInfo] =  {  } # 路由层级关系映射

    for r in routes:
        route_map[r.name] = r
    
   
    for route in routes:
        if route.parent_name:
            if not route_map[route.parent_name].children:
                route_map[route.parent_name].children = []
            route_map[route.parent_name].children.append(route)
            
    return [route for route in routes if not route.parent_name]
 
 
def add_plugin_name(route: RouteInfo, plugin_name: str):
    route.plugin_name = plugin_name
    return route 
        
        
@lru_cache(typed=False)
def get_all_routes():
    config: BaseConfig = get_config()
    routes: List[RouteInfo] = []
    mainRoutes = config.appInfo.pages
    
    if mainRoutes and len(mainRoutes) > 0:
        # 加载主路由
        routes.extend([ add_plugin_name(route, 'main') for route in mainRoutes])
        
    # 加载子应用路由
    for plugin in config.plugins:
        if plugin.enable and plugin.type == ModuleType.PLUGIN:
            # 加载插件路由
            routes.extend([ add_plugin_name(route, plugin.name) for route in plugin.pages])
            
    target_routes = generate_admin_router(flat_routes(routes))
    return target_routes
    


def clear_routes_cache():
    get_all_routes.cache_clear()

__all__ = ["adminRouter", "load_routers"]