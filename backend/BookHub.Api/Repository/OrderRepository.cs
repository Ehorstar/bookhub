using BookHub.Api.Entities;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order> CreateAsync(Order order);
        Task<List<Order>> GetByUserIdAsync(string userId);
        Task ReplaceAsync(string id, Order existing);
        Task<(long totalOrders, decimal avgTotal)> GetStatsAsync();
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
        public async Task ReplaceAsync(string id, Order existing)
        {
            var filter = Builders<Order>.Filter.Eq(x => x.Id, id);
            await _collection.ReplaceOneAsync(filter, existing);
        }
        public async Task<(long totalOrders, decimal avgTotal)> GetStatsAsync()
        {
            var result = await _collection.Aggregate()
                .Group(
                    o => 1,
                    g => new
                    {
                        TotalOrders = g.Count(),
                        AvgTotal = g.Average(x => x.Total)
                    })
                .FirstOrDefaultAsync();

            if (result == null)
                return (0, 0);

            return (result.TotalOrders, result.AvgTotal);
        }
    }
}
