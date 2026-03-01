using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{

    public interface IUserRepository : IRepository<User>
    {
        Task<User> CreateUserAsync(User user);
        Task<User> GetByEmail(string email);
        Task ReplaceAsync(string id, User user);
    }
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IOptions<MongoDbSettings> settings) : base(settings)
        {
        }
        public async Task<User> CreateUserAsync(User user)
        {
            await _collection.InsertOneAsync(user);
            return user;
        }
        public async Task<User> GetByEmail(string email)
        {
            var filter = Builders<User>.Filter.Eq("email", email);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task ReplaceAsync(string id, User user)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, id);
            await _collection.ReplaceOneAsync(filter, user);
        }
    }
}