import Footer from "../widgets/footer";
import Header from "../widgets/header";
import Router from "./routing";
import "./styles/index.css";

function App() {
  return (
    <div className="app">
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
