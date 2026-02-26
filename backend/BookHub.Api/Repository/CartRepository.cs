using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        private readonly IMongoCollection<Cart> _collection;

        public CartRepository(IOptions<MongoDbSettings> settings)
            : base(settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _collection = database.GetCollection<Cart>(nameof(Cart));
        }

        public async Task<Cart?> GetByCartIdAsync(string cartId)
        {
            return await _collection
                .Find(c => c.CartId == cartId)
                .FirstOrDefaultAsync();
        }
    }
}