from typing import Annotated

from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from app.schemas.user import User, UserInDB

from app.config import settings
from app.schemas.token import TokenData


async def get_user(db, user_name: str):
    user_dict = await db["users"].find_one({"user_name": user_name})
    if user_dict is not None:
        return UserInDB(**user_dict)


async def get_current_user(db, token):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_name: str = payload.get("sub")
        if user_name is None:
            raise credentials_exception
        token_data = TokenData(user_name=user_name)
    except JWTError:
        raise credentials_exception
    user = await get_user(db, user_name=token_data.user_name)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user