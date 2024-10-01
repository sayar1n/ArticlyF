from pydantic import BaseModel


class RegisterUserSchemaRequest(BaseModel):
    nickname: str
    email: str
    password: str
    logo: str | None = None
