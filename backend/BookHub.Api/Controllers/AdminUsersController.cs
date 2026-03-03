using BookHub.Api.Dtos;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IUserRepository _users;

        public AdminUsersController(IUserRepository users)
        {
            _users = users;
        }

        [HttpGet]
        public async Task<ActionResult<List<AdminUserDto>>> GetAll()
        {
            var items = await _users.GetAllAsync();

            var result = items.Select(u => new AdminUserDto
            {
                Id = u.Id,
                Email = u.Email,
                Roles = u.Roles ?? new List<string>(),
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminUserDto>> GetById(string id)
        {
            var u = await _users.GetByIdAsync(id);
            if (u == null) return NotFound();

            return Ok(new AdminUserDto
            {
                Id = u.Id,
                Email = u.Email,
                Roles = u.Roles ?? new List<string>(),
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var u = await _users.GetByIdAsync(id);
            if (u == null) return NotFound();

            await _users.DeleteAsync(id);
            return NoContent();
        }
    }
}