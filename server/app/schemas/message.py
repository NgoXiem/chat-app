from pydantic import BaseModel, Field


class Message(BaseModel):
    message: str = Field(...)
    fromSelf: bool = Field(...)
    sender: str = Field(...)
    to: str = Field(...)
    created_at: str = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "message": "Hello World!",
                "fromSelf": True,
                "to": "johndoe",
                "created_at": "2021-01-01 00:00:00"
            }
        },
        orm_mode = True