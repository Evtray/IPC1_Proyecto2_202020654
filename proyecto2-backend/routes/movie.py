from fastapi import APIRouter, Query, HTTPException
from pymongo import MongoClient
from configs.db import conn
from schemas.movie import movieEntity, moviesEntity
from models.movie import Movie
from bson import ObjectId
from datetime import datetime

movie_router = APIRouter()

# Specify the database
db = conn.proyecto2ipc1

@movie_router.get("/movies")
def get_movies(movie_id: str = Query(None)):
    query = {}
    if movie_id:
        query["_id"] = ObjectId(movie_id)

    pipeline = [
        {
            "$addFields": {
                "movie_id": { "$toObjectId": "$_id" }
            }
        },
        {
            "$lookup": {
                "from": "comment",
                "localField": "movie_id",
                "foreignField": "movie_uid",
                "as": "comments"
            }
        },
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "description": 1,
                "genre": 1,
                "MDA": 1,
                "year": 1,
                "duration": 1,
                "comments": {
                    "$map": {
                        "input": "$comments",
                        "as": "c",
                        "in": {
                            "id": { "$toString": { "$ifNull": ["$$c._id", ""] } },
                            "user_uid": { "$toString": { "$ifNull": ["$$c.user_uid", ""] } },
                            "movie_uid": { "$toString": { "$ifNull": ["$$c.movie_uid", ""] } },
                            "comment": { "$ifNull": ["$$c.comment", ""] },
                            "published_on": { "$ifNull": ["$$c.published_on", ""] }
                        }
                    }
                }
            }
        }
    ]

    if query:
        pipeline.insert(0, {"$match": query})

    movies = db.movies.aggregate(pipeline)
    return moviesEntity(movies)

@movie_router.post("/movies/create")
def create_movie(movie: Movie):
    new_movie = dict(movie)
    del new_movie["id"]

    # Insert the movie into the database
    id = db.movies.insert_one(new_movie).inserted_id

    # Retrieve the created movie
    created_movie = db.movies.find_one({"_id": id})

    # Convert the movie entity and return it
    return movieEntity(created_movie)

@movie_router.put("/movies/update/{movie_id}")
def update_movie(movie_id: str, movie: Movie):
    movie_id = ObjectId(movie_id)
    update_fields = {}

    if movie.name is not None:
        update_fields["name"] = movie.name
    if movie.description is not None:
        update_fields["description"] = movie.description
    if movie.genre is not None:
        update_fields["genre"] = movie.genre
    if movie.MDA is not None:
        update_fields["MDA"] = movie.MDA
    if movie.year is not None:
        update_fields["year"] = movie.year
    if movie.duration is not None:
        update_fields["duration"] = movie.duration

    if update_fields:
        db.movies.update_one({"_id": movie_id}, {"$set": update_fields})

    return movieEntity(db.movies.find_one({"_id": movie_id}))

@movie_router.delete("/movies/{movie_id}")
def delete_movie(movie_id: str):
    result = db.movies.delete_one({"_id": ObjectId(movie_id)})
    if result.deleted_count == 1:
        return {"message": "Movie deleted successfully"}
    else:
        return {"message": "Movie not found"}