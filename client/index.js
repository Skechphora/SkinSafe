import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import App from "./App";
import store from "./Slices/store";

// Grabbing the element on 'index.html' with the ID of 'root' to render our 'App' component on
const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

// Refactored index.js to just render the 'App' component, keeping the <Provider> wrapper to
// allow access to the store for all child components. Routing is done inside the 'App' component.
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
