from fastapi import APIRouter
from typing import Annotated, List
from fastapi import Depends

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

from app.schemas.user import User
from app.api import deps
from app.db import db

router = APIRouter()

# @router.get("/users/me/", response_model=User)
# async def read_users_me(
#     current_user: Annotated[User, Depends(deps.get_current_active_user)]
# ):
#     return current_user


# Create a new user
@router.post("/", response_description="Add new student", response_model=User)
async def create_user(user: User = Body(...)):
    user = jsonable_encoder(user)
    new_user = await db["users"].insert_one(user)
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

