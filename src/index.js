import "./index.css";
import App from "./App";
import React from "react";
import rootReducer from "./reducer";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer:rootReducer
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
