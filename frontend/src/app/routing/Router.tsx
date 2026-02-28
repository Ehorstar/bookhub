import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/ui/HomePage";
import WishlistPage from "../../pages/wishlist";
import BookPage from "../../pages/book/ui/BookPage";
import ScrollToTop from "../../shared/lib/ScrollToTop/ScrollToTop";
import CategoryPage from "../../pages/genre-page";

export default function Router() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/book/:slug" element={<BookPage />} />
        <Route path="/books/:category" element={<CategoryPage />} />
      </Routes>
    </>
  );
}
