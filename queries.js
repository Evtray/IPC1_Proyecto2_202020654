db.getCollection("movies").aggregate([
{
             "$addFields": {
                "movie_id": { "$toObjectId": "$_id" }
            },
},
{
        "$lookup": {
        "from": "comment",
        "localField": "movie_id",
        "foreignField": "movie_uid",
        "as": "comments"
    }
    
}])
