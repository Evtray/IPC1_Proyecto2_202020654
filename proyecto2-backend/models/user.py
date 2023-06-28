from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: Optional[str]
    name: str
    lastname: str
    password: Optional[str]
    username: str
    is_admin: Optional[bool]
