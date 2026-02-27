using BookHub.Api.Entities;

namespace BookHub.Api.Dtos
{
    public class CartItemDto
    {
        public Book Book { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal Total { get; set; } 
    }

    public class CartDto
    {
        public string CartId { get; set; } = null!;
        public List<CartItemDto> Items { get; set; } = new();
        public decimal Total { get; set; }
    }
}
