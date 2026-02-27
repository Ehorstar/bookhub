using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface ICartRepository : IRepository<Cart>
    {
        Task<Cart> CreateNewAsync();
        Task<Cart?> GetByCartIdAsync(string cartId);
    }
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        public CartRepository(IOptions<MongoDbSettings> settings) : base(settings)
        {
        }
        public async Task<Cart> CreateNewAsync()
        {
            var cart = new Cart
            {
                CartId = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _collection.InsertOneAsync(cart);
            return cart;
        }
        public Task<Cart?> GetByCartIdAsync(string cartId) =>
            _collection.Find(c => c.CartId == cartId).FirstOrDefaultAsync();
    }
}