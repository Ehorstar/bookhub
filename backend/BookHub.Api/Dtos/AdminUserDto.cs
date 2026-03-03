namespace BookHub.Api.Dtos
{
    public class AdminUserDto
    {
        public string Id { get; set; } = null!;
        public string Email { get; set; } = null!;
        public List<string> Roles { get; set; } = new();
    }
}