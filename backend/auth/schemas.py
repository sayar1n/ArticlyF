from pydantic import BaseModel


class RegisterUserSchemaRequest(BaseModel):
    nickname: str = Field(default="kitty")
    email: str
    password: str
    logo: str | None = None
