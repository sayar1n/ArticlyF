from pydantic import BaseModel


class UserRegisterRequestSchema(BaseModel):
    nickname: str
    email: str
    password: str
