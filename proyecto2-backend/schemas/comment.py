def commentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "user_uid": item["user_uid"],
        "published_on": item["published_on"],
        "movie_uid": item["movie_uid"],
        "comment": item["comment"],
    }