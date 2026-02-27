import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/ui/HomePage";
import WishlistPage from "../../pages/wishlist";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}
