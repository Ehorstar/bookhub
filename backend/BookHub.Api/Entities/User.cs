using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookHub.Api.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("username")]
        public string UserName { get; set; } = default!;

        [BsonElement("email")]
        public string Email { get; set; } = default!;

        [BsonElement("phone")]
        public string? Phone { get; set; }

        [BsonElement("passwordhash")]
        public string PasswordHash { get; set; } = default!;

        [BsonElement("firstName")]
        public string? FirstName { get; set; }

        [BsonElement("lastName")]
        public string? LastName { get; set; }

        [BsonElement("city")]
        public string? City { get; set; }

        [BsonElement("department")]
        public string? Department { get; set; }

        [BsonElement("birthDate")]
        public DateTime? BirthDate { get; set; }

        [BsonElement("roles")]
        public List<string> Roles { get; set; } = new() { "User" };
    }
}
