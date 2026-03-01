namespace BookHub.Api.Dtos
{
    public class UpdateProfileRequestDto
    {
        public string? Phone { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}