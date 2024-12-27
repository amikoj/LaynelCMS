from functools import lru_cache
from typing import Callable, Dict, List
from fastapi import  Request, Response
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI

from .utils import get_lib_key, load_dependencies, load_js_libs
from ..config import BaseConfig, get_config, RouteInfo, ModuleType,ModuleInfo, JsLibInfo
from fastapi.middleware.gzip import GZipMiddleware
CONTEXT_DICT_KEY = "__context__"

admin = FastAPI(title="后台管理系统", description="后台管理系统", version="0.0.1")
templates: Jinja2Templates = Jinja2Templates(directory="templates", trim_blocks=True, lstrip_blocks=True)

admin.mount("/static", StaticFiles(directory="dist"), name="main_static")

admin.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)

config: BaseConfig  = get_config()

# 主路由
mainRoute = RouteInfo(
    name='main', 
    title='主页', 
    url='/', 
    icon='home', 
    component='project.dashborad.index', 
    plugin_name='main'
    )

# 登陆路由
loginRoute = RouteInfo(
    name='login', 
    title='登录', 
    url='/login', 
    icon='login', 
    component='project.login.index', 
    plugin_name='main'
    )

@lru_cache(typed=False)   
def get_main_libs_info():
    return load_js_libs('dist/.vite/manifest.json')

def get_current_plugin_libs_info(plugin: ModuleInfo): 
    if not plugin or plugin.name =='main':
        get_main_libs_info.cache_clear()
        return get_main_libs_info()
    else:
        return load_js_libs(f'dist/{plugin.path}/.vite/manifest.json')
    
def clear_main_libs_info_cache():
    get_main_libs_info.cache_clear()
    
    
    
def get_extra(route: RouteInfo) -> str:
    """ 获取头部额外信息
    """    
    component = route.component
    plugin_name = 'main' if not route.plugin_name  else route.plugin_name
    main_libs = get_main_libs_info()
    pluginInfo: ModuleInfo = config.get_plugin_by_name(route.plugin_name)
    current_libs = get_current_plugin_libs_info(pluginInfo)
    print(current_libs)
    is_main = plugin_name =='main'
    static_prefix = 'static' if is_main else f'static/{plugin_name}/'
    
    entryJs: Dict = current_libs[component]
    baseEntryJs: Dict = main_libs['project.base.index']
    
    baseEntryJsFilePath = baseEntryJs['file']
    entryJsFilePath = entryJs['file']
    
    ctx: Dict = {
        "scripts": [
            f'<script type="module" src="/admin/{static_prefix}/{baseEntryJsFilePath}"></script>', 
            f'<script type="module" src="/admin/{static_prefix}/{entryJsFilePath}"></script>'
        ],
        "extra_head": [
            *load_dependencies(baseEntryJs, main_libs, 'main'),
        ],
        'entry': f'/admin/{static_prefix}/{entryJsFilePath}',
    }
    
    if baseEntryJs['file'] != entryJs['file']:
        ctx['extra_head'].extend(load_dependencies(entryJs, current_libs, plugin_name))
    return ctx
        


def get_context_from_route(route: RouteInfo) -> Dict:
    """ 通过路由信息生成上下文信息
    """
    extra = get_extra(route)
    ctx: Dict = {
        "title": route.title,
        "extra_head": extra['extra_head'],
        "scripts": extra['scripts'],
        'script_str':'',
        'extra_head_str': '',
        CONTEXT_DICT_KEY: {
            "name": route.name,
            'static': route.plugin_name if route.plugin_name else 'main' + '_static',
            'route': route.model_dump_json(),
            'libs': get_main_libs_info(),
            'entry': extra['entry'],
            'extra_head': extra['extra_head'],
        }
    } 
    
    ctx['script_str'] = '\n'.join(extra['scripts'])
    ctx['extra_head_str'] ='\n'.join(extra['extra_head'])
    
    return ctx

@admin.middleware("http")
async def set_public_header_str(request: Request, call_next) -> str:
    '''设置获取公共头部信息
    '''
    response: HTMLResponse = await call_next(request)
    return response


@admin.get("/", response_class=HTMLResponse)
async def index(request: Request): 
    '''需要判断是否登录，控制进入login页面还是后台管理系统首页
    '''
    return  templates.TemplateResponse("index.html", {
        "request": request, 
        **get_context_from_route(mainRoute)
    })


@admin.get("/login")
async def login(request: Request, response: Response):
    # 登录页面
    content =  templates.TemplateResponse("login.html", {
        "request": request, 
        **get_context_from_route(mainRoute),
    })
    return content  


def redirect_to(url: str):
    def redirect(request: Request):
        return RedirectResponse(url)
    return redirect


def renderFunc(route: RouteInfo) -> Callable:
    
    def render(request: Request,response: Response):
        ctx = get_context_from_route(route)
        ctx['request'] = request
        content =  templates.TemplateResponse("index.html",  context=ctx)
        return content
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
    
    global config
    config = get_config()
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
   
def reload_routes(app: FastAPI):
    '''
    重新加载后端管理系统路由
    '''
    clear_routes_cache()
    load_routes(app)

# 内置后端管理系统路由配置
def get_static_routes():
    return [
        {
            
        }
    ]
    
    
def parse_lib_info(info: Dict, key: str) -> JsLibInfo:
    info = JsLibInfo(**info)
    targetKey = get_lib_key(key)
    info.component = targetKey
    return info

    
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
    
    
    


__all__ = ["adminRouter", "load_routers", "clear_routes_cache", "reload_routes", 'CONTEXT_DICT_KEY']