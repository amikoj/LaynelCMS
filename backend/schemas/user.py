from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    
class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    
class UserUpdate(UserBase):
    password: Optional[str] = None
    
class UserInDB(UserBase):
    id: int
    is_active: bool = True
    is_superuser: bool = False
    hash_password: str
    
    class Config:
        orm_mode = True
        
class User(UserBase):
    pass