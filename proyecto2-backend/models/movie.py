from typing import Optional, List
from pydantic import BaseModel


class Movie(BaseModel):
    id: Optional[str]
    src: str
    genre: str
    MPA: str
    year: int
    duration: int
    comments: List['comment.Comment']