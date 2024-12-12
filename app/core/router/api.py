

from fastapi import APIRouter, FastAPI


apiRourter = APIRouter(prefix="/api", tags=["API"])


def  load_routes(app: FastAPI):
    pass



__all__ = ["apiRourter", "load_routes"]