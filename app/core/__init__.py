"""
Core module of LaynelCMS
"""
__version__ = "0.0.1"

import fastapi as FastAPI
from . import plugin
from .dependencies import plugin_dependencies, theme_dependencies
from .routes import load_routes, __routes__, RouterInfo,router, templates
from  . import config


# Initialize the core module
def init_app(app: FastAPI):
    """
    Initializes the core module of the application
    """
    # 初始化读取生成配置
    config.init_app(app)  

    


__all__ = [
    "__version__", 
    "__name__", 
    "__current_theme__", 
    "__plugins__", 
    "init_app",
    "plugin_dependencies",
    "theme_dependencies",
    "load_routes",
    "__routes__",
    "RouterInfo",
    "router",
    "templates",
    "config"
]