import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./pages/App";
import { CarroProvider } from "./context/CarroProvider";
import {MisCursosProvider} from "./context/MisCursosProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <CarroProvider>
            <MisCursosProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
            </MisCursosProvider>
        </CarroProvider>
    </Provider>
  </React.StrictMode>
);
