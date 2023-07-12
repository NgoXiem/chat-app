from pydantic import BaseModel, Field
from typing import Optional

class Message(BaseModel):
    message: str = Field(...)
    sender: str = Field(...)
    to: str = Field(...)
    created_at: str = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "message": "Hello World!",
                "to": "johndoe",
                "created_at": "2021-01-01 00:00:00"
            }
        },
        orm_mode = True

class MessageOut(Message):
    fromSelf: bool = Field(...)