using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private const string CartCookieName = "cartId";

    private readonly ICartRepository _cart;
    private readonly IOrderRepository _orders;
    private readonly IBookRepository _books;
    private readonly Web3 _web3;
    private readonly IConfiguration _cfg;

    public OrdersController(
        ICartRepository cart,
        IOrderRepository orders,
        IBookRepository books,
        Web3 web3,
        IConfiguration cfg)
    {
        _cart = cart;
        _orders = orders;
        _books = books;
        _web3 = web3;
        _cfg = cfg;
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutRequestDto req)
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                  ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        if (string.IsNullOrWhiteSpace(req.TxHash))
            return BadRequest("TxHash is required");

        if (!Request.Cookies.TryGetValue(CartCookieName, out var cartId))
            return BadRequest("Cart not found");

        var cart = await _cart.GetByCartIdAsync(cartId);
        if (cart == null || cart.Items.Count == 0)
            return BadRequest("Cart is empty");

        var ids = cart.Items.Select(i => i.BookId)
            .Where(id => !string.IsNullOrWhiteSpace(id))
            .Distinct()
            .ToList();

        var books = await _books.GetByIdsAsync(ids);
        var bookById = books.ToDictionary(b => b.Id!, b => b);

        var items = cart.Items
            .Where(i => bookById.ContainsKey(i.BookId))
            .Select(i => new OrderItem
            {
                BookId = i.BookId,
                Title = bookById[i.BookId].Title,
                Cover = bookById[i.BookId].CoverImage,
                Price = bookById[i.BookId].Price,
                Quantity = i.Quantity
            })
            .ToList();

        if (items.Count == 0)
            return BadRequest("No valid items in cart");

        var total = items.Sum(i => i.Price * i.Quantity);

        var contractAddress = _cfg["Blockchain:ContractAddress"];
        if (string.IsNullOrWhiteSpace(contractAddress))
            return Problem("Blockchain:ContractAddress missing");

        var receipt = await _web3.Eth.Transactions
            .GetTransactionReceipt
            .SendRequestAsync(req.TxHash);

        if (receipt == null)
            return BadRequest("Transaction not found yet (wait a bit and retry)");

        if (receipt.Status == null || receipt.Status.Value == 0)
            return BadRequest("Transaction failed");

        var tx = await _web3.Eth.Transactions
            .GetTransactionByHash
            .SendRequestAsync(req.TxHash);

        if (tx == null)
            return BadRequest("Transaction not found");

        if (!string.Equals(tx.To, contractAddress, StringComparison.OrdinalIgnoreCase))
            return BadRequest("Transaction was not sent to our contract");

        var expectedWei = Nethereum.Web3.Web3.Convert.ToWei(total);
        if (tx.Value.Value < expectedWei)
            return BadRequest("Paid amount is less than order total");

        var order = new Order
        {
            UserId = userId,
            Items = items,
            Total = total,
            Status = "Paid",
            CreatedAt = DateTime.UtcNow,
            TxHash = req.TxHash, 
            Delivery = new DeliveryInfo
            {
                City = req.City.Trim(),
                Department = req.Department.Trim(),
                Phone = req.Phone.Trim(),
                FirstName = req.FirstName.Trim(),
                LastName = req.LastName.Trim()
            }
        };

        await _orders.CreateAsync(order);
        await _cart.ClearByCartIdAsync(cartId);

        return Ok(new { orderId = order.Id, total });
    }

    [HttpGet("my")]
    public async Task<IActionResult> MyOrders()
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                  ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var orders = await _orders.GetByUserIdAsync(userId);
        return Ok(orders);
    }
}
