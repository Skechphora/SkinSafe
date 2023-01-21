import React from "react";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import "./styles.scss";

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  </BrowserRouter>
);
