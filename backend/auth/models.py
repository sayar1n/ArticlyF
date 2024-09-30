import uuid
from datetime import datetime

from sqlalchemy import String, UUID, DateTime, ARRAY
from sqlalchemy.orm import mapped_column, Mapped

from core.base_model import Base  # noqa


class User(Base):
    __tablename__ = "users"  # noqa

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nickname: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    password: Mapped[str] = mapped_column(String)
    logo: Mapped[str] = mapped_column(String)
    last_login_date: Mapped[list[datetime]] = mapped_column(ARRAY(DateTime),
                                                            default=lambda: [datetime.now()], nullable=False)
    tasks: Mapped[list[str]] = mapped_column(type_=ARRAY(String), nullable=True)
    notes: Mapped[list[str]] = mapped_column(type_=ARRAY(String), nullable=True)

