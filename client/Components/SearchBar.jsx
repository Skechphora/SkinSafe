// This component lives on the search page and contains the search bar and submit button

import React from "react";

const SearchBar = () => {
  return (
    <div>
      {/* input field where user can type their allergen */}
      <input placeholder="What should we avoid?"></input>
      {/* associated submit button */}
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
