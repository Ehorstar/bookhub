using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet("{cartId}")]
        public async Task<ActionResult<Cart>> GetCart(string cartId)
        {
            var cart = await _cartRepository.GetByCartIdAsync(cartId);

            if (cart == null)
                return NotFound();

            return Ok(cart);
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> CreateCart()
        {
            var cart = new Cart
            {
                CartId = Guid.NewGuid().ToString()
            };

            await _cartRepository.CreateAsync(cart);
            return Ok(cart);
        }

        [HttpPost("{cartId}/items")]
        public async Task<IActionResult> AddItem(string cartId, [FromBody] CartItem item)
        {
            var cart = await _cartRepository.GetByCartIdAsync(cartId);

            if (cart == null)
                return NotFound();

            var existingItem = cart.Items.FirstOrDefault(i => i.BookId == item.BookId);

            if (existingItem != null)
                existingItem.Quantity += item.Quantity;
            else
                cart.Items.Add(item);

            cart.UpdatedAt = DateTime.UtcNow;
            await _cartRepository.UpdateAsync(cart.Id!, cart);

            return NoContent();
        }

        [HttpDelete("{cartId}/items/{bookId}")]
        public async Task<IActionResult> RemoveItem(string cartId, string bookId)
        {
            var cart = await _cartRepository.GetByCartIdAsync(cartId);

            if (cart == null)
                return NotFound();

            cart.Items.RemoveAll(i => i.BookId == bookId);
            cart.UpdatedAt = DateTime.UtcNow;

            await _cartRepository.UpdateAsync(cart.Id!, cart);
            return NoContent();
        }
    }
}