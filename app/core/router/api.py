

from fastapi import FastAPI
from ...api import init_app

api = FastAPI(title="Laynel CMS API", version="1.0.0", description="API for Laynel CMS")

def  load_routes(app: FastAPI):
    init_app(api)
    app.mount("/api", api, name="Laynel CMS API")
      
def reload_routes(app: FastAPI):
    load_routes(app)

__all__ = ["apiRouter", "load_routes", "reload_routes"]