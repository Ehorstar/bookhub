 using MongoDB.Bson;
 using MongoDB.Bson.Serialization.Attributes;

namespace BookHub.Api.Entities
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("cartId")]
        public string CartId { get; set; } = null!;

        [BsonElement("items")]
        public List<CartItem> Items { get; set; } = new();

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class CartItem
    {
        [BsonElement("bookId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string BookId { get; set; } = null!;

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("price")]
        public decimal Price { get; set; }
    }
}

