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
        Task<List<Book>> SearchBooks(string search);

    }
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(IOptions<MongoDbSettings> settings) : base(settings)
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
    }
    
}
