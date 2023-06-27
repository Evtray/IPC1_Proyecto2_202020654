from fastapi import APIRouter, Query, HTTPException
from pymongo import MongoClient
from configs.db import conn
from schemas.comment import commentEntity, commentsEntity
from models.comment import Comment
from bson import ObjectId
from datetime import datetime

comment_router = APIRouter()


# Specify the database
db = conn.proyecto2ipc1

@comment_router.get("/comments")
def get_comments(movie_uid: str = Query(None)):
    query = {}
    if movie_uid:
        query["movie_uid"] = ObjectId(movie_uid)

    comments = db.comment.find(query)
    return [commentEntity(comment) for comment in comments]

@comment_router.post("/comments/create")
def create_comment(comment: Comment):
    new_comment = dict(comment)
    del new_comment["id"]

    # Convert user_uid and movie_uid to ObjectId
    new_comment["user_uid"] = ObjectId(new_comment["user_uid"])
    new_comment["movie_uid"] = ObjectId(new_comment["movie_uid"])

    # Set the published_on field to the current date and time
    new_comment["published_on"] = datetime.now()

    # Insert the comment into the database
    id = db.comment.insert_one(new_comment).inserted_id

    # Retrieve the created comment
    created_comment = db.comment.find_one({"_id": id})

    # Convert the comment entity and return it
    return commentEntity(created_comment)
