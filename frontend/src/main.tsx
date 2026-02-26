import { createRoot } from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
