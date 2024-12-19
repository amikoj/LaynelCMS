from fastapi import FastAPI
from . import admin, api, theme
from ..decorator import debounce


def init_app(app: FastAPI):
    """
    Initialize all routes for the admin system.
    """
    admin.load_routes(app)
    api.load_routes(app)
    theme.load_routes(app)
    
@debounce(3)   
def reload_routes(app: FastAPI):
    """
    Reload all routes for the admin system.
    """
    admin.reload_routes(app)
    # api.reload_routes(app)
    # theme.reload_routes(app)