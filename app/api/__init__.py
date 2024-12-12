
from fastapi import FastAPI, APIRouter
from typing import Union, List, Any
from . import user, role, plugin


register_modules: List[Any] = [user, role, plugin]

def init_app(app: Union[FastAPI, APIRouter]) -> None:
    for module in register_modules:
        module.register_routes(app)
        
        
        
