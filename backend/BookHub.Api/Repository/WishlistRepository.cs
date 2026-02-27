using BookHub.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BookHub.Api.Repository
{
    public interface IWishlistRepository : IRepository<Wishlist>
    {
        Task<Wishlist> CreateNewAsync(string wishlistId);
        Task<Wishlist?> GetByWishlistIdAsync(string wishlistId);
        Task<Wishlist> ToggleWishlistAsync(string wishlistId, string bookId);
    }

    public class WishlistRepository : Repository<Wishlist>, IWishlistRepository
    {
        public WishlistRepository(IOptions<MongoDbSettings> settings) : base(settings) { }

        public async Task<Wishlist?> GetByWishlistIdAsync(string wishlistId)
            => await _collection.Find(x => x.Id == wishlistId).FirstOrDefaultAsync();

        public async Task<Wishlist> CreateNewAsync(string wishlistId)
        {
            var wishlist = new Wishlist
            {
                Id = wishlistId,
                Items = new List<WishlistItem>()
            };

            await _collection.InsertOneAsync(wishlist);
            return wishlist;
        }

        public async Task<Wishlist> ToggleWishlistAsync(string wishlistId, string bookId)
        {
            var wishlist = await GetByWishlistIdAsync(wishlistId);
            if (wishlist == null)
                wishlist = await CreateNewAsync(wishlistId);

            var existing = wishlist.Items.FirstOrDefault(x => x.BookId == bookId);
            if (existing != null) wishlist.Items.Remove(existing);
            else wishlist.Items.Add(new WishlistItem { BookId = bookId });

            await _collection.ReplaceOneAsync(x => x.Id == wishlistId, wishlist);

            return wishlist;
        }
    }
}
