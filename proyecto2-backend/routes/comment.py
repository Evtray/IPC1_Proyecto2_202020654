from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from configs.db import conn
from schemas.comment import commentEntity, commentsEntity
from models.comment import Comment
from bson import ObjectId

comment_router = APIRouter()
db = conn.proyecto2ipc1

@comment_router.get("/comments")
def get_comments():
    return commentsEntity(db.comment.find())

@comment_router.post("/comments/create")
def create_comment(comment: Comment):
    new_comment = dict(comment)
    del new_comment["id"]
    id = db.comment.insert_one(new_comment).inserted_id
    return commentEntity(db.comment.find_one({"_id": id}))

@comment_router.put("/comments/update/{comment_uid}")
def update_comment(comment_uid: str, comment: Comment):
    comment_id = ObjectId(comment_uid)
    update_fields = {}

    # Add conditions for updating specific fields

    if update_fields:
        db.comment.update_one({"_id": comment_id}, {"$set": update_fields})

    return commentEntity(db.comment.find_one({"_id": comment_id}))

@comment_router.delete("/comments/delete/{comment_uid}")
def delete_comment(comment_uid: str):
    comment_id = ObjectId(comment_uid)
    comment = db.comment.find_one_and_delete({"_id": comment_id})
    if comment:
        return commentEntity(comment)
    else:
        return {"message": "Comment not found"}
