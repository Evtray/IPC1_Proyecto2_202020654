from schemas.comment import commentsEntity

def movieEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item["description"],
        "genre": item["genre"],
        "MDA": item["MDA"],
        "year": item["year"],
        "duration": item["duration"],
        "comments": commentsEntity(item.get("comments", []))
    }

def moviesEntity(entity) -> list:
    return [movieEntity(item) for item in entity]