using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; } = null!;

    public List<OrderItem> Items { get; set; } = new();

    public decimal Total { get; set; }

    public string Status { get; set; } = "Created"; 
    public DateTime CreatedAt { get; set; }
    public DeliveryInfo Delivery { get; set; } = new();
    public string? TxHash { get; set; }
}

public class OrderItem
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string BookId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Cover { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
public class DeliveryInfo
{
    public string City { get; set; } = "";
    public string Department { get; set; } = "";
    public string Phone { get; set; } = "";      
    public string FirstName { get; set; } = "";  
    public string LastName { get; set; } = "";  
}