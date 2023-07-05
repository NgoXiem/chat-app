from fastapi import FastAPI
from app.api.endpoints import users
from app.api.endpoints import messages
from fastapi.middleware.cors import CORSMiddleware
import socketio

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


sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=[] # CORS will be handled by FastAPI not SocketIO
)

# wrap with ASGI application
socket_app = socketio.ASGIApp(sio)

def authenticate_user(environ):
    pass


@sio.on('connect')
def connection(sid, message):
  print('Connected!')


@sio.event
def disconnect(sid):
    print('Disconnect ', sid)
   

@sio.on('send_message')
async def receive(sid, message):
    print('send_message', sid, message)
    await sio.emit('receive_message', message)
    

app.mount('/', socket_app)