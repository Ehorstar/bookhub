import { BodyScrollLock } from "../shared/lib/BodyScroll/BodyScroll";
import Footer from "../widgets/footer";
import Header from "../widgets/header";
import { useUiState } from "../widgets/header/model/modal-state";
import Router from "./routing";
import "./styles/index.css";

function App() {
  const { isOpen } = useUiState();
  const locked = isOpen("cart") || isOpen("profile");
  return (
    <div className="app">
      <BodyScrollLock locked={locked} />
      <Header />
      <main className="content">
        <div className="container">
          <Router />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
