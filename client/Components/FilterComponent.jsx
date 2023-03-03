/** Filtering was also a WIP, not implemented in the application **/
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { update_filtered_results } from "../Slices/productsSlice";

const FilterComponent = () => {
  let [brand, updateBrand] = useState("");
  let [category, updateCategory] = useState("");
  const selectedBrand = useRef();
  const selectedCategory = useRef();

  updateBrand = () => {
    brand = selectedBrand.current.value;
  };

  updateCategory = () => {
    category = selectedCategory.current.value;
  };

  // grabs the allergens from state (set on each search in the SearchBar component)
  const productList = useSelector((state) => state.products.results);
  //console.log('first item of productList',productList[0])

  // populates an array of one list item per allergen to render
  let brands = [];
  let categories = [];
  let brandCache = {};
  let categoryCache = {};
  for (let [i, product] of productList.entries()) {
    if (!brandCache[product["brand_name"]]) {
      brands.push(
        <option
          key={i}
          value={product["brand_name"]}
        >
          {product["brand_name"]}
        </option>
      );
      brandCache[product["brand_name"]] = true;
    }
    if (!categoryCache[product["category"]]) {
      categories.push(
        <option
          key={i}
          value={product["category"]}
        >
          {product["category"]}
        </option>
      );
      categoryCache[product["category"]] = true;
    }
  }

  // const clickHandler = () => {
  // 	updateBrand();
  // 	updateCategory();
  // 	console.log(brand, category);
  // 	let filteredProducts = []
  // 	console.log("LOOK HERE FOR FILTERED PRODUCTS")
  // 	for (let product of productList){
  // 		if ( (inputBrand.current.value != "" && product['brand_name'] == inputBrand.current.value) ||
  // 				 (inputCategory.current.value != "" && product['category'] == inputCategory.current.value) ) {
  //     filteredProducts.push(product)
  // 	}
  // }
  // alert("LOOK HERE FOR FILTERED PRODUCTS")
  // alert(filteredProducts)
  // //dispatch(update_filtered_results(filteredProducts))
  // const filteredState = useSelector((state)=> state.products.filteredResults)
  // console.log(filteredState)
  // alert(filteredState)
  // dispatch(update_results(filteredProducts))
  // }

  // render all allergens in an unordered list
  return (
    <>
      <form
        id="filter-form"
        onSubmit={() => clickHandler()}
      >
        <label htmlFor="brand-filter">Filter by Brand:</label>
        <select
          className="brandFilterBox"
          id="brandFilterBox"
          placeholder="Select Brand"
        >
          <option
            value={brand}
            ref={selectedBrand}
          >
            Select Brand
          </option>
          {brands}
        </select>
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          className="categoryFilterBox"
          id="categoryFilterBox"
          placeholder="Select Category"
        >
          <option
            value={category}
            ref={selectedCategory}
          >
            Select Category
          </option>
          {categories}
        </select>
        <button
          id="filter-button"
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          Filter Results
        </button>
      </form>
    </>
  );
};

export default FilterComponent;
