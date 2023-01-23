// This component lives on the search page and contains the search bar and submit button

import React from "react";

const SearchBar = () => {
  return (
    <div id="search-group">
      {/* input field where user can type their allergen */}
      <input id="search-bar" placeholder="What should we avoid?"></input>
      {/* associated submit button */}
      <div><button id="search-button">Search</button></div>
    </div>
  );
};

export default SearchBar;