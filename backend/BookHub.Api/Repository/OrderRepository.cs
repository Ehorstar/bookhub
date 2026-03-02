using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order order);
        Task<List<Order>> GetByUserIdAsync(string userId);
    }
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(IMongoDatabase db) : base(db) { }

        public async Task<Order> CreateAsync(Order order)
        {
            await _collection.InsertOneAsync(order);
            return order;
        }

        public async Task<List<Order>> GetByUserIdAsync(string userId)
        {
            var filter = Builders<Order>.Filter.Eq(x => x.UserId, userId);
            return await _collection.Find(filter)
                .SortByDescending(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}
