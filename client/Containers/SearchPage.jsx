// This is the top level container of the Search page

import React from "react";
import SearchBar from "../Components/SearchBar.jsx";

const SearchPage = () => {
  return (
    <div>
      {/* This component renders the Search Bar component */}
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;
