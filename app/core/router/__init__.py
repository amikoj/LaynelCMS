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
    