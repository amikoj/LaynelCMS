'''
This is the main file of the project.
It initializes the FastAPI app and registers the routers.
'''
__name__ = "laynelcms"
__version__ = "0.0.1"






from fastapi import FastAPI
import core
import routes


def init_app(config: dict = None):
    app = FastAPI(title="Laynel CMS", version=__version__)
    
    # 初始化核心模块
    core.init_app(app)
    
    # 注册路由
    routes.init_app(app)
    
    return app 


# export the init_app function
__all__ = ["init_app"]