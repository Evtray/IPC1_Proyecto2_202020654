from fastapi import FastAPI
from routes.user import user_router
from routes.comment import comment_router
from routes.movie import movie_router

app = FastAPI()

app.include_router(user_router)
app.include_router(comment_router)
app.include_router(movie_router)
