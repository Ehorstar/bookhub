using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookHub.Api.Entities
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("author")]
        public string Author { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("oldPrice")]
        public decimal? OldPrice { get; set; }

        [BsonElement("inStock")]
        public bool InStock { get; set; }

        [BsonElement("stockCount")]
        public int StockCount { get; set; }

        [BsonElement("coverImage")]
        public string CoverImage { get; set; } = null!;

        [BsonElement("images")]
        public List<string> Images { get; set; } = new();

        [BsonElement("categories")]
        public List<string> Categories { get; set; } = new();

        [BsonElement("language")]
        public string Language { get; set; } = null!;

        [BsonElement("publisher")]
        public string Publisher { get; set; } = null!;

        [BsonElement("year")]
        public int Year { get; set; }

        [BsonElement("pages")]
        public int Pages { get; set; }

        [BsonElement("binding")]
        public string Binding { get; set; } = null!;

        [BsonElement("isbn")]
        public string Isbn { get; set; } = null!;

        [BsonElement("rating")]
        public double Rating { get; set; }

        [BsonElement("reviewsCount")]
        public int ReviewsCount { get; set; }

        [BsonElement("slug")]
        public string Slug { get; set; } = null!;
    }
}