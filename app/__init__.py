'''
This is the main file of the project.
It initializes the FastAPI app and registers the routers.
'''
__name__ = "laynelcms"
__version__ = "0.0.1"
__author__ = "Laynel"

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import core
import routes

templates = Jinja2Templates(directory="templates")


def init_app(config: dict = None):
    app = FastAPI(title="Laynel CMS", version=__version__)
    
    
    # 注册静态文件目录
    app.mount("/static", StaticFiles(directory="public"), name="static")
    # 初始化核心模块
    core.init_app(app)
    # 注册路由
    routes.init_app(app)
    
    
    return app 


# export the init_app function
__all__ = ["init_app"]