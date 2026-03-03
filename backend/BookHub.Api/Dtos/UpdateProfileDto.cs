namespace BookHub.Api.Dtos
{
    public class UpdateProfileRequestDto
    {
        public string? City { get; set; }
        public string? Department { get; set; }
        public string? Phone { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
