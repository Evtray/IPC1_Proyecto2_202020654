

def commentEntity(item) -> dict:
    comment_id = str(item.get("_id", ""))  # If _id is not present, use an empty string
    return {
        "id": comment_id,
        "user_uid": str(item["user_uid"]),
        "movie_uid": str(item["movie_uid"]),
        "comment": item["comment"],
        "published_on": item["published_on"],
    }

def commentsEntity(entity) -> list:
    return [commentEntity(item) for item in entity]
