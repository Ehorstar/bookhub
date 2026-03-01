using BookHub.Api.Dtos;
using BookHub.Api.Entities;
using BookHub.Api.Repository;
using BookHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BookHub.Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class AuthController : ControllerBase
    {
        private const string AuthCookieName = "jwtToken";
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwt;

        public AuthController(IUserRepository userRepository, IJwtService jwt)
        {
            _userRepository = userRepository;
            _jwt = jwt;
        }

        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var isAuthenticated = User?.Identity?.IsAuthenticated ?? false;

            if (!isAuthenticated)
                return Ok(new { isAuthenticated = false });

            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                         ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Ok(new { isAuthenticated = false });

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return Ok(new { isAuthenticated = false });

            return Ok(new
            {
                isAuthenticated = true,
                userId = user.Id,
                email = user.Email,
                username = user.UserName,
                firstName = user.FirstName,
                lastName = user.LastName,
                phone = user.Phone,
                birthDate = user.BirthDate
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<object>> Register([FromBody] RegisterRequestDto req)
        {
            var existing = await _userRepository.GetByEmail(req.Email);
            if (existing != null)
                return BadRequest("Email already registered");

            var hash = BCrypt.Net.BCrypt.HashPassword(req.Password);

            var user = new User
            {
                UserName = req.UserName,
                Email = req.Email,
                PasswordHash = hash,
                Phone = req.Phone
            };

            await _userRepository.CreateUserAsync(user);

            return Ok(new { user.Id, user.UserName, user.Email, user.Phone });
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequestDto req)
        {
            var user = await _userRepository.GetByEmail(req.Email);
            if (user == null)
                return Unauthorized("Invalid email or password");

            var ok = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
            if (!ok)
                return Unauthorized("Invalid email or password");

            var token = _jwt.CreateToken(user);

            Response.Cookies.Append(AuthCookieName, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            });

            return Ok(new
            {
                user = new { user.Id, user.UserName, user.Email, user.Phone, user.FirstName,user.LastName, user.BirthDate }
            });
        }

       
        [HttpPatch("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequestDto req)
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                         ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return Unauthorized();

            user.Phone = req.Phone ?? user.Phone;
            user.FirstName = req.FirstName ?? user.FirstName;
            user.LastName = req.LastName ?? user.LastName;
            user.BirthDate = req.BirthDate ?? user.BirthDate;

            await _userRepository.ReplaceAsync(userId, user);
            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(AuthCookieName);
            return Ok(new { message = "Logged out successfully" });
        }
    }
}