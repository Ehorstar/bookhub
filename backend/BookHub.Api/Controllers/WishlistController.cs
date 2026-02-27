using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/wishlist")]
public class WishlistController : ControllerBase
{
    private const string WishlistCookieName = "wishlistId";
    private readonly IWishlistRepository _wishlistRepository;
    private readonly IBookRepository _bookRepository;

    public WishlistController(IWishlistRepository wishlistRepository, IBookRepository bookRepository)
    {
        _wishlistRepository = wishlistRepository;
        _bookRepository = bookRepository;
    }

    private CookieOptions BuildWishlistCookieOptions() => new CookieOptions
    {
        HttpOnly = true,
        Secure = Request.IsHttps,
        SameSite = SameSiteMode.Lax,
        Expires = DateTimeOffset.UtcNow.AddDays(30)
    };

    private async Task<Wishlist> GetOrCreateWishlistAsync()
    {
        if (!Request.Cookies.TryGetValue(WishlistCookieName, out var wishlistId) ||
            string.IsNullOrWhiteSpace(wishlistId))
        {
            wishlistId = Guid.NewGuid().ToString();
            Response.Cookies.Append(WishlistCookieName, wishlistId, BuildWishlistCookieOptions());
        }

        var wishlist = await _wishlistRepository.GetByWishlistIdAsync(wishlistId);
        if (wishlist != null) return wishlist;

        return await _wishlistRepository.CreateNewAsync(wishlistId);
    }

    [HttpGet]
    public async Task<ActionResult> GetWishlist()
    {
        var wishlist = await GetOrCreateWishlistAsync();

        var ids = wishlist.Items.Select(i => i.BookId).Distinct().ToList();
        var books = await _bookRepository.GetByIdsAsync(ids);

        return Ok(new
        {
            wishlistId = wishlist.Id,
            items = books
        });
    }

    public record ToggleDto(string BookId);

    [HttpPost("toggle")]
    public async Task<ActionResult> Toggle([FromBody] ToggleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.BookId))
            return BadRequest(new { error = "bookId is required" });

        var wishlist = await GetOrCreateWishlistAsync();
        var updated = await _wishlistRepository.ToggleWishlistAsync(wishlist.Id, dto.BookId);

        var ids = updated.Items.Select(i => i.BookId).Distinct().ToList();
        var books = await _bookRepository.GetByIdsAsync(ids);

        return Ok(new
        {
            wishlistId = updated.Id,
            items = books
        });
    }
}