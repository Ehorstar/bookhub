namespace BookHub.Api.Dtos
{   
public class AdminOrderDto
{
    public string Id { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public List<AdminOrderItemDto> Items { get; set; } = new List<AdminOrderItemDto>();
    public DateTime CreatedAt { get; set; }

    public AdminDeliveryInfoDto Delivery { get; set; } = null!;
    }

    public class AdminDeliveryInfoDto
    {
        public string Id { get; set; } 
        public string UserId { get; set; } 
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public string City { get; set; } 
        public string Department { get; set; } 
        public string Phone { get; set; }
     }

    public class AdminOrderItemDto
    {
    public string BookId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Cover { get; set; } = null!;
     public int Quantity { get; set; }
    public decimal Price { get; set; }
}

    public class UpdateOrderStatusDto
{ 
    public string Status { get; set; } = null!;
}

}
 