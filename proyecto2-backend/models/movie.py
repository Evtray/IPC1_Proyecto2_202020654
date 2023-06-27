from typing import Optional, List
from pydantic import BaseModel
from models.comment import Comment

class Movie(BaseModel):
    id: Optional[str]
    name: str
    description: str
    src: str
    preview: str
    genre: str
    MDA: str
    year: str
    duration: str
    comments: Optional[List[Comment]] = []