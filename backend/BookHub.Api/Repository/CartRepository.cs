using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface ICartRepository : IRepository<Cart>
    {
        Task<Cart> CreateNewAsync();
        Task<Cart?> GetByCartIdAsync(string cartId);
        Task SetUserIdAsync(string cartId, string userId);
        Task ClearByCartIdAsync(string cartId);
    }
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        public CartRepository(IMongoDatabase database) : base(database)
        {
        }
        public async Task SetUserIdAsync(string cartId, string userId)
        {
            var filter = Builders<Cart>.Filter.Eq(c => c.CartId, cartId);
            var update = Builders<Cart>.Update.Set(c => c.UserId, userId);
            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task ClearByCartIdAsync(string cartId)
        {
            var filter = Builders<Cart>.Filter.Eq(c => c.CartId, cartId);
            var update = Builders<Cart>.Update
                .Set(c => c.Items, new List<CartItem>())
                .Set(c => c.UpdatedAt, DateTime.UtcNow);
            await _collection.UpdateOneAsync(filter, update);
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