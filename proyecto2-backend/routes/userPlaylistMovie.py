from fastapi import APIRouter, Query, HTTPException
from pymongo import MongoClient
from configs.db import conn
from bson import ObjectId
from schemas.userPlaylistMovie import userPlaylistMovieEntity, userPlaylistMoviesEntity
from models.userPlaylistMovie import UserPlaylistMovie

# Specify the database
db = conn.proyecto2ipc1

user_movies_playlist_router = APIRouter()


@user_movies_playlist_router.get("/userMoviesPlaylist")
def get_user_movies_playlist(user_uid: str = Query(None)):
    query = {}
    if user_uid:
        query["user_uid"] = ObjectId(user_uid)

    user_movies_playlist = db.user_movies_playlist.find(query)
    return [userPlaylistMovieEntity(item) for item in user_movies_playlist]


@user_movies_playlist_router.post("/userMoviesPlaylist")
def create_user_movies_playlist(user_movie: UserPlaylistMovie):
    # Convert user_uid and movie_uid to ObjectId
    user_uid = ObjectId(user_movie.user_uid)
    movie_uid = ObjectId(user_movie.movie_uid)

    # Check if the user movie already exists
    existing_user_movie = db.user_movies_playlist.find_one({"user_uid": user_uid, "movie_uid": movie_uid})
    if existing_user_movie:
        raise HTTPException(status_code=400, detail="User movie already exists")

    # Create the new user movie
    new_user_movie = {
        "user_uid": user_uid,
        "movie_uid": movie_uid
    }

    # Insert the user movie into the database
    id = db.user_movies_playlist.insert_one(new_user_movie).inserted_id

    # Retrieve the created user movie
    created_user_movie = db.user_movies_playlist.find_one({"_id": id})

    # Convert the user movie entity and return it
    return userPlaylistMovieEntity(created_user_movie)


@user_movies_playlist_router.delete("/userMoviesPlaylist")
def delete_user_movies_playlist(user_uid: str = Query(...), movie_uid: str = Query(...)):
    # Convert user_uid and movie_uid to ObjectId
    user_uid = ObjectId(user_uid)
    movie_uid = ObjectId(movie_uid)

    # Delete the user movie from the database
    result = db.user_movies_playlist.delete_one({"user_uid": user_uid, "movie_uid": movie_uid})

    # Check if the user movie was found and deleted
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User movie not found")

    return {"message": "User movie deleted successfully"}