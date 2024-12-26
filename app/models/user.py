from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from .util import table_name

class UserBase(BaseModel):
    user_name:str
    nick_name:str
    email:EmailStr
    avatar: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    last_login: Optional[datetime] = None
    
class UserCreate(UserBase):
    password:str = Field(..., min_length=8, max_length=100)
    
    
class UserUpdate(UserBase):
    password:Optional[str] = None
    
    
class UserInDB(UserBase):
    id:int
    is_admin:bool = False
    is_active:bool = True
    hash_password:str
    
    class Config:
        __tablename__  =  table_name('sys_user')
        orm_mode = True
        
class User(UserBase):
    pass