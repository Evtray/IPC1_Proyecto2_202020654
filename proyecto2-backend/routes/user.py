from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from configs.db import conn
from schemas.user import userEntity, usersEntity
from models.user import User
from bson import ObjectId
from passlib.context import CryptContext
import secrets
from datetime import datetime


user_router = APIRouter()

# Specify the database
db = conn.proyecto2ipc1

# Create a password context for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@user_router.get("/users")
def get_users():
    return usersEntity(db.user.find())

@user_router.post("/users/create")
def create_user(user: User):
    existing_user = db.user.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username is already taken")
    
    new_user = dict(user)
    del new_user["id"]
    new_user["password"] = hash_password(new_user["password"])  # Hash the password
    id = db.user.insert_one(new_user).inserted_id
    return userEntity(db.user.find_one({"_id": id}))

@user_router.put("/users/update/{user_uid}")
def update_user(user_uid: str, user: User):
    user_id = ObjectId(user_uid)
    update_fields = {}

    if user.name is not None:
        update_fields["name"] = user.name
    if user.lastname is not None:
        update_fields["lastname"] = user.lastname
    if user.password is not None:
        update_fields["password"] = hash_password(user.password)  # Hash the password
    if user.username is not None:
        update_fields["username"] = user.username
    if user.is_admin is not None:
        update_fields["is_admin"] = user.is_admin

    if update_fields:
        db.user.update_one({"_id": user_id}, {"$set": update_fields})

    return userEntity(db.user.find_one({"_id": user_id}))

@user_router.delete("/users/delete/{user_uid}")
def delete_user(user_uid: str):
    user_id = ObjectId(user_uid)
    user = db.user.find_one_and_delete({"_id": user_id})
    if user:
        return userEntity(user)
    else:
        return {"message": "User not found"}

@user_router.get("/users/login")
def login(username: str, password: str):
    user = db.user.find_one({"username": username})
    if user and verify_password(password, user["password"]):
        token = secrets.token_hex(16)  # Generate a random token
        token_data = {
            "user_id": str(user["_id"]),
            "token": token,
            "timestamp": datetime.now()
        }
        db.userTokens.insert_one(token_data)  # Save token data in userTokens collection
        return {"message": "Login successful", "token": token}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")

@user_router.post("/users/logout")
def logout(token: str):
    deleted_count = db.userTokens.delete_one({"token": token}).deleted_count
    if deleted_count:
        return {"message": "Logout successful"}
    else:
        raise HTTPException(status_code=404, detail="Token not found")

# Helper function to hash the password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Helper function to verify the password
def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)
