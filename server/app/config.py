from pydantic import BaseSettings
import secrets
class Settings(BaseSettings):
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    secret_key: str = secrets.token_urlsafe(32)
    db_uri: str ="mongodb://localhost:27017"

    class Config:
        env_file = ".env"

settings = Settings()