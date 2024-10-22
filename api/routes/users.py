from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
router = APIRouter()

class User(BaseModel):
    username: str = Field(..., max_length=50)
    email: str = Field(..., max_length=100)
    password: str = Field(..., max_length=100)

@router.get('/{id}', response_model=User)
async def get_user(id: int):
    # get all users logic here
    return {"message": "All users retrieved successfully"}
    
    
@router.post('/', response_model=User)
async def create_user(user: User):
    # create user logic here
    return {"message": "User created successfully"}