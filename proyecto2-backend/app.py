from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user_router
from routes.comment import comment_router
from routes.movie import movie_router

app = FastAPI()

# Define the allowed origins for CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://example.com",
    "http://example.com:8080",
]

# Add the CORS middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Included routers
app.include_router(user_router)
app.include_router(comment_router)
app.include_router(movie_router)
