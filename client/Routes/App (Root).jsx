// This is our highest level, our App page. It renders containers based on the requested route

import React from "react";

import "../styles.scss";

const App = (props) => {
  return (
    // This line is here and the others commented out to easily demonstrate that react routers work
    <div>We are in the main app page</div>
    // This page will be a place to hold anything we want to render on all logged-in pages
    // Routing is not done here so logic has been removed
  );
};

export default App;
