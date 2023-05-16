from fastapi import FastAPI

from app.api.endpoints import users, messages

app = FastAPI()

app.include_router(users.router)
# app.include_router(messages.router)
