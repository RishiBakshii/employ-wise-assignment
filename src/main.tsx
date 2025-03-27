import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router"; // ✅ Import BrowserRouter
import { App } from "./App.tsx";
import "./index.css";
import { store } from "./lib/redux/store/store.ts";
import { ModalWrapper } from "./components/Modal/ModalWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ModalWrapper/>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
