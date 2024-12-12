from fastapi import APIRouter, FastAPI
from typing import Union


router = APIRouter(prefix="/role", tags=["角色管理"])

def register_routes(app: Union[FastAPI, APIRouter]):
    #注册路由
    app.include_router(router)



__all__ = ["register_routes"]