using BookHub.Api.Dtos;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/admin/orders")]
    [Authorize(Roles = "Admin")]
    public class AdminOrdersController : ControllerBase
    {
        private readonly IOrderRepository _orders;

        public AdminOrdersController(IOrderRepository orders)
        {
            _orders = orders;
        }

        [HttpGet]
        public async Task<ActionResult<List<AdminOrderDto>>> GetAll()
        {
            var items = await _orders.GetAllAsync();

            var result = items.Select(o => new AdminOrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                TotalPrice = o.Total,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                Items = o.Items.Select(i => new AdminOrderItemDto
                {
                    BookId = i.BookId,
                    Title = i.Title,
                    Cover = i.Cover,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList(),
                 Delivery = new AdminDeliveryInfoDto
                 {
                     FirstName = o.Delivery.FirstName,
                     LastName = o.Delivery.LastName,
                     City = o.Delivery.City,
                     Department = o.Delivery.Department,
                     Phone = o.Delivery.Phone
                 }
            }).ToList();

            return Ok(result);
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var stats = await _orders.GetStatsAsync();

            return Ok(new
            {
                totalOrders = stats.totalOrders,
                averageOrderValue = stats.avgTotal
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] UpdateOrderStatusDto dto)
        {
            var order = await _orders.GetByIdAsync(id);
            if (order == null) return NotFound();
            order.Status = dto.Status;
            await _orders.ReplaceAsync(id, order);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var order = await _orders.GetByIdAsync(id);
            if (order == null) return NotFound();

            await _orders.DeleteAsync(id);
            return NoContent();
        }
    }

}