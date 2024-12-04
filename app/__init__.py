'''
This is the main file of the project.
It initializes the FastAPI app and registers the routers.
'''
__version__ = "0.0.1"
__author__ = "Laynel"

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from . import core

def init_app(config: dict = None):
    """_summary_ This function initializes the FastAPI app and registers the routers.

    Args:
        config (dict, optional): _description_. Defaults to None.

    Returns:
        _type_: _description_
    """
    app = FastAPI(title="Laynel CMS", version=__version__)

    # 初始化核心模块
    core.init_app(app)

    print("Laynel CMS is running...")
    print("Visit http://localhost:8000/docs to see the API documentation.") 
    
    
    
    return app 


# export the init_app function
__all__ = ["init_app"]