using BookHub.Api.Dtos;
using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/admin/books")]
    [Authorize(Roles = "Admin")]
    public class AdminBooksController : ControllerBase
    {
        private readonly IBookRepository _books;

        public AdminBooksController(IBookRepository books)
        {
            _books = books;
        }
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetAll()
        {
            var items = await _books.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetById(string id)
        {
            var book = await _books.GetByIdAsync(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> Create([FromBody] CreateBookDto dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                Description = dto.Description,
                Price = dto.Price,
                OldPrice = dto.OldPrice,
                StockCount = dto.StockCount,
                InStock = dto.StockCount > 0,
                CoverImage = dto.CoverImage,
                Images = dto.Images,
                Categories = dto.Categories,
                Language = dto.Language,
                Publisher = dto.Publisher,
                Year = dto.Year,
                Pages = dto.Pages,
                Binding = dto.Binding,
                Slug = dto.Slug,
            };

            await _books.CreateAsync(book);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateBookDto dto)
        {
            var existing = await _books.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Title = dto.Title;
            existing.Author = dto.Author;
            existing.Description = dto.Description;
            existing.Price = dto.Price;
            existing.OldPrice = dto.OldPrice;
            existing.StockCount = dto.StockCount;
            existing.InStock = dto.StockCount > 0;
            existing.CoverImage = dto.CoverImage;
            existing.Images = dto.Images;
            existing.Categories = dto.Categories;
            existing.Language = dto.Language;
            existing.Publisher = dto.Publisher;
            existing.Year = dto.Year;
            existing.Pages = dto.Pages;
            existing.Binding = dto.Binding;
            existing.Slug = dto.Slug;

            await _books.ReplaceAsync(id, existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _books.DeleteAsync(id);
            return NoContent();
        }
    }
}
