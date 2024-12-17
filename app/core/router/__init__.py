from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from . import admin, api, theme


def init_app(app: FastAPI):
    """
    Initialize all routes for the admin system.
    """
    admin.load_routes(app)
    api.load_routes(app)
    theme.load_routes(app)
    
    
def reload_routes(app: FastAPI):
    """
    Reload all routes for the admin system.
    """
    admin.reload_routes(app)
    # api.reload_routes(app)
    # theme.reload_routes(app)