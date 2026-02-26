using BookHub.Api.Entities;
using BookHub.Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAll()
            => await _repo.GetAllAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(string id)
        {
            var user = await _repo.GetByIdAsync(id);
            return user is null ? NotFound() : Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            // мінімальна перевірка
            var exists = await _repo.GetByEmailAsync(user.Email);
            if (exists != null) return Conflict("Email already exists");

            await _repo.CreateAsync(user);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}