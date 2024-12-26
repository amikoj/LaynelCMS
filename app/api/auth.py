

from typing import Union
from fastapi import APIRouter, FastAPI


router = APIRouter(prefix="/auth", tags=["权限管理"])

















def register_routes(app: Union[FastAPI, APIRouter]):
    #注册路由
    app.include_router(router)



__all__ = ["register_routes"]