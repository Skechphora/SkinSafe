// This is the top level container of the Search page

import React from "react";
import SearchBar from "../Components/SearchBar.jsx";

const SearchPage = () => {
  return (
    // This line is here and the others commented out to easily demonstrate that react routers work
    // <div>We are in the search page</div>
    <div>
      {/* This component renders the Search Bar component */}
      Test text
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;
