from fastapi import APIRouter
from typing import Annotated, List

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer

from app.schemas.message import Message, MessageOut
from app.db import db

from bson.objectid import ObjectId
from app.api import deps

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



@router.get("/messages", response_description="List all messages", response_model=List[MessageOut])
async def list_messages(send_from: str, send_to: str, token: Annotated[str, Depends(oauth2_scheme)]) -> List[MessageOut]:
    client, database = await db.connect_to_mongo()
    current_user = await deps.get_current_user(database, token)
    messages_cursor = database["messages"].find({
        "sender": { '$in': [send_from, send_to] }, 
        "to": { '$in': [send_from, send_to] }
    })
    messages = await messages_cursor.to_list(length=None)
    for message in messages:
        message["fromSelf"] = message["sender"] == str(current_user.id)
    return messages


@router.post("/message", response_description="Add new message", response_model=Message)
async def create_message(message: Message = Body(...)) -> Message:
    client, database = await db.connect_to_mongo()
    message = jsonable_encoder(message)
    new_message = await database["messages"].insert_one(message)
    created_message = await database["messages"].find_one({"_id": ObjectId(new_message.inserted_id)})
    return Message(**created_message)
