from fastapi import FastAPI
from app.api.endpoints import users
from app.api.endpoints import messages
from fastapi.middleware.cors import CORSMiddleware


origins = ["*"]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(messages.router)
