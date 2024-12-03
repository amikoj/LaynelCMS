"""
Core module of LaynelCMS
"""
__version__ = "0.0.1"
__name__ = "laynelcms-core"


# 初始变量
__current_theme__ = "default" # 当前主题
__plugins__ = {} # 插件列表

import fastapi as FastAPI
import plugin


# Initialize the core module
def init_app(app: FastAPI):
    """
    Initializes the core module of the application
    """
    # Initialize the plugins
    __plugins__ =  plugin.init_app(app)   # 初始化插件
    
    
    
    
    
    
    
    
    pass



__all__ = [
    "__version__", 
    "__name__", 
    "__current_theme__", 
    "__plugins__", 
    "init_app"
]