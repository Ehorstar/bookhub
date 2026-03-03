using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<List<Book>> GetByIdsAsync(List<string> ids);
        Task<Book> GetBySlugAsync(string slug);
        Task ReplaceAsync(string id, Book existing);
        Task<List<Book>> SearchBooks(string search);
        Task<bool> TryDecreaseStockAsync(string bookId, int qty);
    }
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(IMongoDatabase database) : base(database)
        {
        }

        public async Task<List<Book>> GetByIdsAsync(List<string> ids)
        {

            var objectIds = ids.Select(id => new ObjectId(id)).ToList();

            var filter = Builders<Book>.Filter.In("_id", objectIds);

            return await _collection.Find(filter).ToListAsync();

        }

        public async Task<Book> GetBySlugAsync(string slug)
        {
            var filter = Builders<Book>.Filter.Eq("Slug", slug);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<Book>> SearchBooks(string search)
        {
            if (string.IsNullOrWhiteSpace(search) || search.Trim().Length < 2)
                return new List<Book>();

            search = search.Trim();

            var filter = Builders<Book>.Filter.Or(
                Builders<Book>.Filter.Regex("Title", new BsonRegularExpression(search, "i")),
                Builders<Book>.Filter.Regex("Author", new BsonRegularExpression(search, "i"))
            );

            return await _collection
                .Find(filter)
                .Limit(20)
                .ToListAsync();
        }
        public async Task<bool> TryDecreaseStockAsync(string bookId, int qty)
        {
            var filter = Builders<Book>.Filter.And(
                Builders<Book>.Filter.Eq(b => b.Id, bookId),
                Builders<Book>.Filter.Gte(b => b.StockCount, qty)
            );

            var update = Builders<Book>.Update.Inc(b => b.StockCount, -qty);

            var res = await _collection.UpdateOneAsync(filter, update);
            return res.ModifiedCount == 1;
        }

        public async Task ReplaceAsync(string id, Book existing)
        {
            var filter = Builders<Book>.Filter.Eq("_id", new ObjectId(id));
            await _collection.ReplaceOneAsync(filter, existing);
        }
    }
}
