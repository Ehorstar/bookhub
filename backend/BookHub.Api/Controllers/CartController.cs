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
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        private CookieOptions BuildCartCookieOptions()
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
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
        [HttpGet]
        public async Task<ActionResult> GetCartAsync()
        {
            var (cart, isNew) = await GetOrCreateCartAsync();
            return Ok(new
            {
                message = isNew ? "Cart created" : "Cart found",
                cart
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
            return Ok(new
            {
                message = "Item was add",
                cart
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

            return Ok(new
            {
                message = "Item Qty was set",
                cart
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
            return Ok(new
            {
                message =  "Item deleted",
                cart
            });
        }
    }
}