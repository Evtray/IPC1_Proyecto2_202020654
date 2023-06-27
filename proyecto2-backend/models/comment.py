from typing import Optional
from pydantic import BaseModel


class Comment(BaseModel):
    id: Optional[str]
    user_uid: str
    published_on: str
    movie_uid: str
    comment: str