from fastapi import APIRouter
from typing import Annotated, List
from fastapi import Depends

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

from app.schemas.user import User, UserRegistrationRequest, UserInDB
from app.api import deps
from app.db import db

from app.core.security import get_password_hash, verify_password

from bson.objectid import ObjectId


router = APIRouter()

# @router.get("/users/me/", response_model=User)
# async def read_users_me(
#     current_user: Annotated[User, Depends(deps.get_current_active_user)]
# ):
#     return current_user


# Create a new user
@router.post("/register", response_description="Add new user", response_model=User)
async def create_user(user: UserRegistrationRequest = Body(...)) -> User:
    
    client, database = await db.connect_to_mongo()

    # Check if user already exists
    if await database["users"].find_one({"user_name": user.user_name}):
        raise HTTPException(status_code=400, detail="user_name already registered")
    else:
        user = UserInDB(
            user_name=user.user_name,
            email=user.email,
            disabled=user.disabled,
            hashed_password=get_password_hash(user.password),
        )
        user = jsonable_encoder(user)
        new_user = await database["users"].insert_one(user)
        created_user = await database["users"].find_one({"_id": ObjectId(new_user.inserted_id)})
        return User(**created_user)


@router.get("/users", response_model=List[User])
async def get_all_users():
    client, database = await db.connect_to_mongo()
    collection = database["users"]
    users = []

    async for user in collection.find():
        users.append(user)
    
    return users