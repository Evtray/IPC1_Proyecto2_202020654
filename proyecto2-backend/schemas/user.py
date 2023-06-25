def userEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "lastname": item["lastname"],
        "username": item["username"],
        "password": item["password"],
        "is_admin": item["is_admin"],
    }

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]