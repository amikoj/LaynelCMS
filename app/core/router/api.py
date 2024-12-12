

from fastapi import APIRouter, FastAPI
from ...api import init_app

api = FastAPI(title="Laynel CMS API", version="1.0.0", description="API for Laynel CMS")

def  load_routes(app: FastAPI):
    init_app(api)
    app.mount("/api", api, name="Laynle CMS API")

__all__ = ["apiRouter", "load_routes"]