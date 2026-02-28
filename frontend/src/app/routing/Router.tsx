import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/ui/HomePage";
import WishlistPage from "../../pages/wishlist";
import BookPage from "../../pages/book/ui/BookPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/book/:slug" element={<BookPage />} />
    </Routes>
  );
}
