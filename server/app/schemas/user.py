from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    user_name: str = Field(...)
    email: str = Field(...)
    disabled: bool = Field(...)
    avatar: str | None = None
    class Config:
        schema_extra = {
            "example": {
                "user_name": "johndoe",
                "email": "john@doe.com",
                "disabled": False,
                "avatar": ""
            }
        },
        orm_mode = True

class UserInDB(User):
    hashed_password: str = Field(...),
    class Config:
        orm_mode = True
        
        
class UserLoginRequest(BaseModel):
    user_name: str = Field(...)
    password: str = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "user_name": "johndoe",
                "password": "password",
            }
        },
        orm_mode = True

class UserRegistrationRequest(BaseModel):
    user_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    confirm: str = Field(...)
    disabled: bool = False
    class Config:
        schema_extra = {
            "example": {
                "user_name": "johndoe",
                "email": "john@doe.com",
                "password": "password",
                "confirm": "password",
            }
        },
        orm_mode = True



