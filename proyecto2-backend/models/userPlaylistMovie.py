from typing import Optional
from pydantic import BaseModel

class UserPlaylistMovie(BaseModel):
    id: Optional[str]
    user_uid: str
    movie_uid: str