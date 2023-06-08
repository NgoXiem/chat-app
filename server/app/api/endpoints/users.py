from fastapi import APIRouter
from typing import Annotated, List
from fastapi import Depends
from datetime import timedelta


from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer

from app.config import settings
from app.core import security
from app.schemas.user import User, UserRegistrationRequest, UserInDB, UserLoginRequest
from app.schemas.token import Token
from app.api import deps
from app.db import db
from app.core.security import get_password_hash, verify_password

from bson.objectid import ObjectId


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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


@router.post("/login", response_description="Login user", response_model=Token)
async def login_for_access_token(payload: UserLoginRequest = Body(...)) -> Token:
    client, database = await db.connect_to_mongo()
    user = await security.authenticate_user(database, payload.user_name, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect user_name or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = security.create_access_token(
        data={"sub": user.user_name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/user/me", response_model=User) 
async def get_user_me(token: Annotated[str, Depends(oauth2_scheme)]):
    client, database = await db.connect_to_mongo()
    current_user = await deps.get_current_user(database, token)
    return current_user


@router.get("/users", response_model=List[User])
async def get_all_users():
    client, database = await db.connect_to_mongo()
    collection = database["users"]
    users = []
    async for user in collection.find():
        users.append(user)
    return users