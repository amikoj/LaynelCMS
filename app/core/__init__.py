"""
Core module of LaynelCMS
"""
__version__ = "0.0.1"

import fastapi as FastAPI
from . import plugin
from .dependencies import plugin_dependencies, theme_dependencies
from .routes import load_routes, __routes__, RouterInfo,router, templates


# Initialize the core module
def init_app(app: FastAPI):
    """
    Initializes the core module of the application
    """
    # Initialize the plugins
    plugin.init_app(app)   # 初始化插件
    load_routes(app)
    


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
    "templates"
]