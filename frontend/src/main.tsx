import { createRoot } from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "tippy.js/dist/tippy.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
