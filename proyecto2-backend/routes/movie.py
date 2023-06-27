from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from configs.db import conn
from schemas.movie import movieEntity, moviesEntity
from models.movie import Movie
from bson import ObjectId

movie_router = APIRouter()
db = conn.proyecto2ipc1

@movie_router.get("/movies")
def get_movies():
    return moviesEntity(db.movie.find())

@movie_router.post("/movies/create")
def create_movie(movie: Movie):
    new_movie = dict(movie)
    del new_movie["id"]
    id = db.movie.insert_one(new_movie).inserted_id
    return movieEntity(db.movie.find_one({"_id": id}))

@movie_router.put("/movies/update/{movie_uid}")
def update_movie(movie_uid: str, movie: Movie):
    movie_id = ObjectId(movie_uid)
    update_fields = {}

    # Add conditions for updating specific fields

    if update_fields:
        db.movie.update_one({"_id": movie_id}, {"$set": update_fields})

    return movieEntity(db.movie.find_one({"_id": movie_id}))

@movie_router.delete("/movies/delete/{movie_uid}")
def delete_movie(movie_uid: str):
    movie_id = ObjectId(movie_uid)
    movie = db.movie.find_one_and_delete({"_id": movie_id})
    if movie:
        return movieEntity(movie)
    else:
        return {"message": "Movie not found"}
