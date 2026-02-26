using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookHub.Api.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        public UserRole Role { get; set; } = UserRole.User;

        [BsonRepresentation(BsonType.ObjectId)]
        public string? CartId { get; set; }
    }
}