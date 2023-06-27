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