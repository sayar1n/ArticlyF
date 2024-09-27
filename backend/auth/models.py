import uuid
from datetime import datetime

from sqlalchemy import String, UUID, DateTime
from sqlalchemy.orm import mapped_column, Mapped

from backend.core.base_model import Base


class User(Base):
    __tablename__ = "users"  # noqa

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nickname: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    password: Mapped[str] = mapped_column(String)
    last_login: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(), nullable=False)

