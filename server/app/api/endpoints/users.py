from fastapi import APIRouter
from typing import Annotated, List
from fastapi import Depends

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

from app.schemas.user import User
from app.api import deps
from app.db import db

from bson.objectid import ObjectId


router = APIRouter()

# @router.get("/users/me/", response_model=User)
# async def read_users_me(
#     current_user: Annotated[User, Depends(deps.get_current_active_user)]
# ):
#     return current_user


# Create a new user
@router.post("/", response_description="Add new user", response_model=User)
async def create_user(user: User = Body(...)):
    client, database = await db.connect_to_mongo()
    user = jsonable_encoder(user)
    new_user = await database["users"].insert_one(user)
    created_user = await database["users"].find_one({"_id": ObjectId(new_user.inserted_id)})
    return created_user
    # return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


@router.get("/users", response_model=List[User])
async def get_all_users():
    client, database = await db.connect_to_mongo()
    collection = database["users"]
    users = []

    async for user in collection.find():
        users.append(user)
    
    return users