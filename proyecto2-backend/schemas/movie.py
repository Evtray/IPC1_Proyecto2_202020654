def movieEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "src": item["src"],
        "genre": item["genre"],
        "MPA": item["MPA"],
        "year": item["year"],
        "duration": item["duration"],
        "comments": [commentEntity(comment) for comment in item["comments"]],
    }