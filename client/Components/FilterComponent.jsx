import React from 'react';
import { useSelector } from 'react-redux';

const FilterComponent = () => {
  // grabs the allergens from state (set on each search in the SearchBar component)
  const productList = useSelector((state) => state.products.results);
  console.log('first item of productList',productList[0])
  // populates an array of one list item per allergen to render 

  // render all allergens in an unordered list
  return (
    <>
    <div>
            <div>
            <label for="dog-names">Filter by Brand:</label>
            </div>
    </div>
    <div>
            <div>
            <select className = "brandFilterBox" id="dog-names">
                <option value="rigatoni">Rigatoni</option>
                <option value="dave">Dave</option>
                <option value="pumpernickel">Pumpernickel</option>
                <option value="reeses">Reeses</option>
            </select>
            </div>
    </div>            
    <div>
            <div>
            <label for="dog-names">Filter by Category: </label>
            </div>
    </div>
    <div>
            <div>
            <select className = "categoryFilterBox" id="dog-names">
                <option value="rigatoni">Rigatoni</option>
                <option value="dave">Dave</option>
                <option value="pumpernickel">Pumpernickel</option>
                <option value="reeses">Reeses</option>
            </select>
            </div>
     </div>
     <div>
        <form><button>Filter Results</button></form>
     </div>
    </>
  );
};

export default FilterComponent;
