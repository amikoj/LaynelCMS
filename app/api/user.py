from sqlalchemy import Column, Integer, String, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from fastapi import APIRouter, FastAPI
from typing import Union

router = APIRouter(prefix="/user", tags=["用户管理"])
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(100))
    email = Column(String(100), unique=True)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(String(50))
    updated_at = Column(String(50))
    last_login = Column(String(50))
    avatar = Column(String(255))
    introduction = Column(Text)
    
    

def register_routes(app: Union[FastAPI, APIRouter]):
    #注册路由
    app.include_router(router)



__all__ = ["register_routes"]