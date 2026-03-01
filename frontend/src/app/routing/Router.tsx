import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/ui/HomePage";
import WishlistPage from "../../pages/wishlist";
import BookPage from "../../pages/book/ui/BookPage";
import ScrollToTop from "../../shared/lib/ScrollToTop/ScrollToTop";
import CategoryPage from "../../pages/genre-page";
import AboutBookHub from "../../pages/serving-pages/ui/AboutBookHub";
import PaymentDelivery from "../../pages/serving-pages/ui/PaymentDelivery";
import TermsUse from "../../pages/serving-pages/ui/TermsUse";

export default function Router() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutBookHub />} />
        <Route path="/payment-delivery" element={<PaymentDelivery />} />
        <Route path="/users-agreement" element={<TermsUse />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/book/:slug" element={<BookPage />} />
        <Route path="/books/:category" element={<CategoryPage />} />
      </Routes>
    </>
  );
}
