def userPlaylistMovieEntity(item) -> dict:
    comment_id = str(item.get("_id", ""))  # If _id is not present, use an empty string
    return {
        "id": comment_id,
        "user_uid": str(item["user_uid"]),
        "movie_uid": str(item["movie_uid"]),
    }

def userPlaylistMoviesEntity(entity) -> list:
    return [userPlaylistMovieEntity(item) for item in entity]