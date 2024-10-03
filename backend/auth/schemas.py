from pydantic import BaseModel


class RegisterUserSchemaRequest(BaseModel):
    nickname: str | None = None
    email: str
    password: str
    logo: str | None = None
