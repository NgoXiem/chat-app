from fastapi import APIRouter
from typing import Annotated, List

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer

from app.schemas.message import Message
from app.db import db

from bson.objectid import ObjectId


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



@router.get("/message", response_description="List all messages", response_model=List[Message])
async def list_messages() -> List[Message]:
    client, database = await db.connect_to_mongo()
    messages = await database["messages"].find().to_list(1000)
    return messages


@router.post("/message", response_description="Add new message", response_model=Message)
async def create_message(message: Message = Body(...)) -> Message:
    client, database = await db.connect_to_mongo()
    message = jsonable_encoder(message)
    new_message = await database["messages"].insert_one(message)
    created_message = await database["messages"].find_one({"_id": ObjectId(new_message.inserted_id)})
    return Message(**created_message)


