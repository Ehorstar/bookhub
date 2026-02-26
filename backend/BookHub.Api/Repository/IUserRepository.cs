using BookHub.Api.Entities;

namespace BookHub.Api.Repository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(string id);
        Task<User?> GetByEmailAsync(string email);
        Task CreateAsync(User user);
        Task UpdateAsync(string id, User user);
        Task DeleteAsync(string id);
    }
}