import motor.motor_asyncio
from app.config import settings

async def connect_to_mongo():
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.db_uri)
    db = client["chat"]
    return client, db



