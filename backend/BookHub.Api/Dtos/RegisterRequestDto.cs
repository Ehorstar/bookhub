namespace BookHub.Api.Dtos
{
    public class RegisterRequestDto
    {
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Phone { get; set; } = default!;
    }
}