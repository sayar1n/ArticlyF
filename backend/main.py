from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware

from auth.models import User
from auth.schemas import RegisterUserSchemaRequest
from auth.security import manager, pwd_context, limiter
from core.database import create_session
from task.endpoints import router as task_router # noqa
from note.endpoints import router as note_router  # noqa
from event.endpoints import router as event_router

app = FastAPI(
    title="Articly App"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Замените на URL вашего фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(note_router, prefix="/note", tags=("Notes",))
app.include_router(task_router, prefix="/task", tags=("Tasks",))
app.include_router(event_router, prefix="/event", tags=("Events",))


app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@manager.user_loader()
def query_user(email: str):
    return create_session().query(User).filter(User.email == email).first()


@app.post("/register")
@limiter.limit("50/minute")
async def register(request: Request, user: RegisterUserSchemaRequest):
    db = create_session()
    existing_user = db.query(User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User is already registered.")

    user_data = user.dict()
    if user_data["logo"] is None:
        user_data["logo"] = "default_avatar.png"

    user_data["password"] = pwd_context.hash(user_data["password"])
    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user.id


@app.post("/login")
@limiter.limit("50/minute")
def login(request: Request, data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password

    user = query_user(username)
    if not user:
        raise InvalidCredentialsException
    elif not pwd_context.verify(password, user.password):
        raise InvalidCredentialsException

    access_token = manager.create_access_token(data={"sub": username})
    return {"access_token": access_token}
