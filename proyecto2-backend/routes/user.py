from fastapi import APIRouter
from pymongo import MongoClient
from configs.db import conn
from schemas.user import userEntity, usersEntity
from models.user import User
from bson import ObjectId

user_router = APIRouter()

# Specify the database
db = conn.proyecto2ipc1

@user_router.get("/users")
def get_users():
    return usersEntity(db.user.find())

@user_router.post("/users")
def create_user(user: User):
    new_user = dict(user)
    del new_user["id"]
    print(new_user)
    id = db.user.insert_one(new_user).inserted_id
    return userEntity(db.user.find_one({"_id": id}))

@user_router.get("/users/{user_uid}")
def find_user(user_uid: str):
    user_id = ObjectId(user_uid)
    user = db.user.find_one({"_id": user_id})
    if user:
        return userEntity(user)
    else:
        return {"message": "User not found"}

@user_router.put("/users/{user_uid}")
def update_user(user_uid: str, user: User):
    user_id = ObjectId(user_uid)
    update_fields = {}

    if user.name is not None:
        update_fields["name"] = user.name
    if user.lastname is not None:
        update_fields["lastname"] = user.lastname
    if user.password is not None:
        update_fields["password"] = user.password
    if user.username is not None:
        update_fields["username"] = user.username
    if user.is_admin is not None:
        update_fields["is_admin"] = user.is_admin

    if update_fields:
        db.user.update_one({"_id": user_id}, {"$set": update_fields})

    return userEntity(db.user.find_one({"_id": user_id}))


@user_router.delete("/users/{user_uid}")
def delete_user(user_uid: str):
    user_id = ObjectId(user_uid)
    user = db.user.find_one_and_delete({"_id": user_id})
    if user:
        return userEntity(user)
    else:
        return {"message": "User not found"}