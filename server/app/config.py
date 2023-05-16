from pydantic import BaseSettings


class Settings(BaseSettings):
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()