from pydantic import BaseModel, Field

class User(BaseModel):
    username: str = Field(...)
    email: str = Field(...)
    full_name: str = Field(...)
    disabled: bool = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "email": "john@doe.com",
                "full_name": "John Doe",
                "disabled": False,
            }
        }

class UserInDB(User):
    hashed_password: str = Field(...)


