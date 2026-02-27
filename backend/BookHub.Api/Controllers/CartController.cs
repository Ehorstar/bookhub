using BookHub.Api.Dtos;
using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private const string CartCookieName = "cartId";
        private readonly ICartRepository _cartRepository;
        private readonly IBookRepository _bookRepository;

        public CartController(
           ICartRepository cartRepository,
           IBookRepository bookRepository)
        {
            _cartRepository = cartRepository;
            _bookRepository = bookRepository;
        }

        private CookieOptions BuildCartCookieOptions()
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            };
        }
        private async Task<(Cart cart, bool isNew)> GetOrCreateCartAsync()
        {
            if (Request.Cookies.TryGetValue(CartCookieName, out var cartId))
            {
                var cart = await _cartRepository.GetByCartIdAsync(cartId);
                if (cart != null)
                {
                    return (cart, false);
                }
            }
            var newCart = await _cartRepository.CreateNewAsync();
            Response.Cookies.Append(CartCookieName, newCart.CartId, BuildCartCookieOptions());
            return (newCart, true);

        }
        private async Task<CartDto> BuildCartDtoAsync(Cart cart)
        {
            var ids = cart.Items
                .Select(i => i.BookId)
                .Where(id => !string.IsNullOrWhiteSpace(id))
                .Distinct()
                .ToList();

            var books = await _bookRepository.GetByIdsAsync(ids);

            var bookById = books.ToDictionary(b => b.Id!, b => b);

            var itemsDto = new List<CartItemDto>();

            foreach (var it in cart.Items)
            {
                if (!bookById.TryGetValue(it.BookId, out var book))
                    continue;

                var price = it.Price != 0 ? it.Price : book.Price;

                itemsDto.Add(new CartItemDto
                {
                    Book = book,
                    Quantity = it.Quantity,
                    Total = price * it.Quantity
                });
            }

            var total = itemsDto.Sum(x => x.Total);

            return new CartDto
            {
                CartId = cart.CartId,
                Items = itemsDto,
                Total = total
            };
        }

        [HttpGet]
        public async Task<ActionResult> GetCartAsync()
        {
            var (cart, isNew) = await GetOrCreateCartAsync();
            var items = await BuildCartDtoAsync(cart);

            return Ok(new
            {
                message = isNew ? "Cart created" : "Cart found",
                items = items
            });
        }

        [HttpPost("items")]
        public async Task<ActionResult> AddToCart([FromBody] CartItem item)
        {
            var (cart, _) = await GetOrCreateCartAsync();
            var exist = cart.Items.FirstOrDefault(i => i.BookId == item.BookId);
            
            if (exist != null) return NoContent();
            else cart.Items.Add(item);
            cart.UpdatedAt = DateTime.UtcNow;
            await _cartRepository.UpdateAsync(cart.Id!, cart);
            var items = await BuildCartDtoAsync(cart);
            return Ok(new
            {
                message = "Item was add",
                items = items
            });
        }

        [HttpPut("items/{bookId}/qty/{qty}")]
        public async Task<ActionResult> SetItemQty(string bookId, int qty)
        {
            var (cart, _) = await GetOrCreateCartAsync();
            var exist = cart.Items.FirstOrDefault(i => i.BookId == bookId);
           
            if (qty <= 0)
            {
                cart.Items.Remove(exist);
            }
            else
            {
                if (exist == null)
                    cart.Items.Add(new CartItem { BookId = bookId, Quantity = qty, Price = 0 });
                else
                    exist.Quantity = qty;
            }

            cart.UpdatedAt = DateTime.UtcNow;
            await _cartRepository.UpdateAsync(cart.Id!, cart);
            var items = await BuildCartDtoAsync(cart);
            return Ok(new
            {
                message = "Item Qty was set",
                items = items
            });
        }

        [HttpDelete("items/{bookId}")]
        public async Task<ActionResult> RemoveFromCart(string bookId)
        {
            var (cart, _) = await GetOrCreateCartAsync();
            var exist = cart.Items.FirstOrDefault(i => i.BookId == bookId);
            if (exist != null)
            {
                cart.Items.Remove(exist);
                cart.UpdatedAt = DateTime.UtcNow;
                await _cartRepository.UpdateAsync(cart.Id!, cart);
            }
            var items = await BuildCartDtoAsync(cart);
            return Ok(new
            {
                message =  "Item deleted",
                items = items
            });
        }
    }
}