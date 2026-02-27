using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookHub.Api.Entities
{
    public class Wishlist
    {
        [BsonId]
        public string Id { get; set; } = default!;  

        [BsonElement("items")]
        public List<WishlistItem> Items { get; set; } = new();
    }

    public class WishlistItem
    {
        [BsonElement("bookId")]
        public string BookId { get; set; } = null!;
    }
}
