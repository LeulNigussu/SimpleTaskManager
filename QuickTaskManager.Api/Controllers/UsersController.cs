using Microsoft.AspNetCore.Mvc;
using System.Linq;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration; // Add this using statement

[ApiController]
[Route("auth")]
public class UsersController : ControllerBase
{
    private readonly TaskManagerDbContext _context;
    private readonly IConfiguration _configuration; // Inject IConfiguration

    public UsersController(TaskManagerDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
        {
            return BadRequest("Username and Password are required.");
        }

        if (_context.Users.Any(u => u.Username == user.Username))
        {
            return BadRequest("Username already exists.");
        }

        user.Password = BCrypt.HashPassword(user.Password); // Hashing the password.

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(User loginUser)
    {
        if (string.IsNullOrEmpty(loginUser.Username) || string.IsNullOrEmpty(loginUser.Password))
        {
            return BadRequest("Username and Password are required.");
        }

        var user = _context.Users.FirstOrDefault(u => u.Username == loginUser.Username);

        if (user == null || !BCrypt.Verify(loginUser.Password, user.Password))
        {
            return Unauthorized("Invalid username or password.");
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    private string GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}