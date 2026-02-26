using BookHub.Api.Entities;

namespace BookHub.Api.Repository
{
    public interface ICartRepository : IRepository<Cart>
    {
        Task<Cart?> GetByCartIdAsync(string cartId);
    }
}