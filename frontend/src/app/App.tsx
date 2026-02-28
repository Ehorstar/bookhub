import RecentlyViewed from "../features/recently-viewed";
import { useRecentlyViewedStore } from "../features/recently-viewed/model/recently-viewed.store";
import { BodyScrollLock } from "../shared/lib/BodyScroll/BodyScroll";
import Footer from "../widgets/footer";
import Header from "../widgets/header";
import { useUiState } from "../widgets/header/model/modal-state.store";
import Router from "./routing";
import "./styles/index.css";

function App() {
  const { isOpen } = useUiState();
  const locked = isOpen("cart") || isOpen("profile") || isOpen("search");
  const books = useRecentlyViewedStore((s) => s.items);

  return (
    <div className="app">
      <BodyScrollLock locked={locked} />
      <Header />
      <main className="content">
        <div className="container">
          <Router />
        </div>
      </main>
      {books.length > 0 ?<RecentlyViewed />: null}
      
      <Footer />
    </div>
  );
}

export default App;
