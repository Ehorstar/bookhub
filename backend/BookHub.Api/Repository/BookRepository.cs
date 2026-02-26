using BookHub.Api.Entities;
using Microsoft.Extensions.Options;

namespace BookHub.Api.Repository
{
    public interface IBookRepository : IRepository<Book>
    {
    }
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(IOptions<MongoDbSettings> settings) : base(settings)
        {
        }
    }
}
