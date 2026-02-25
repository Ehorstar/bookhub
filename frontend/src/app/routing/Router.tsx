import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/ui/HomePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
