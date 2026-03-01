using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookHub.Api.Entities;
using Microsoft.IdentityModel.Tokens;

namespace BookHub.Api.Services;

public interface IJwtService
{
    string CreateToken(User user);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _config;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public string CreateToken(User user)
    {
        var jwt = _config.GetSection("Jwt");

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? ""),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("username", user.UserName)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiresMinutes = int.TryParse(jwt["ExpiresMinutes"], out var m) ? m : 60;

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}