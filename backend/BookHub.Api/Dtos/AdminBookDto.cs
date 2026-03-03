namespace BookHub.Api.Dtos
{
    public class BookListItemDto
    {
        public string Id { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public bool InStock { get; set; }
        public int StockCount { get; set; }
        public string CoverImage { get; set; } = null!;
        public List<string> Categories { get; set; } = new();
        public string Slug { get; set; } = null!;
    }

    public class CreateBookDto
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public bool InStock { get; set; }
        public int StockCount { get; set; }
        public string CoverImage { get; set; } = null!;
        public List<string> Images { get; set; } = new();
        public List<string> Categories { get; set; } = new();
        public string Language { get; set; } = null!;
        public string Publisher { get; set; } = null!;
        public int Year { get; set; }
        public int Pages { get; set; }
        public string Binding { get; set; } = null!;
        public string Slug { get; set; } = null!;
    }

    public class UpdateBookDto : CreateBookDto
    {
    }
}