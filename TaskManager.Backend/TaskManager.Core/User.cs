using MongoDB.Bson.Serialization.Attributes;

namespace TaskManager.Core
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string UserTypeId { get; set; }
    }
}