from typing import Optional
from pydantic import BaseModel

class Comment(BaseModel):
    id: Optional[str]
    user_uid: str
    movie_uid: str
    comment: str
    published_on: Optional[str]