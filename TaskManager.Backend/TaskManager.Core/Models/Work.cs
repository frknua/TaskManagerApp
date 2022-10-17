using MongoDB.Bson.Serialization.Attributes;

namespace TaskManager.Core.Models
{
    public class Work
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreateDate { get; set; }
        public string DeadLineDate { get; set; }
        public Owner Owner { get; set; }
    }

    public class Owner
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
    }
}
