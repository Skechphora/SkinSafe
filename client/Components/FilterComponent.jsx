import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { update_filtered_results } from '../Slices/productsSlice';

const FilterComponent = () => {
    const inputBrand = useRef();
    const inputCategory = useRef();
  // grabs the allergens from state (set on each search in the SearchBar component)
  const productList = useSelector((state) => state.products.results);
  //console.log('first item of productList',productList[0])
  // populates an array of one list item per allergen to render 
let brands = []
let categories = []
let brandCache = {}
let categoryCache= {}
for (let product of productList){
    if(!brandCache[product['brand_name']]){
        brands.push(<option value={product['brand_name']}>{product['brand_name']}</option>)
        brandCache[product['brand_name']] = true;}
    if (!categoryCache[product['category']]){
    categories.push(<option value={product['category']}>{product['category']}</option>)
        categoryCache[product['category']] = true;}
}
const clickHandler = () => {


let filteredProducts = []
console.log("LOOK HERE FOR FILTERED PRODUCTS")
for (let product of productList){
    if ((inputBrand.current.value != "" && product['brand_name'] == inputBrand.current.value) || (inputCategory.current.value != "" && product['category'] == inputCategory.current.value) ){
        filteredProducts.push(product)
    }
}
alert("LOOK HERE FOR FILTERED PRODUCTS")
alert(filteredProducts)
//dispatch(update_filtered_results(filteredProducts))
const filteredState = useSelector((state)=> state.products.filteredResults)
console.log(filteredState)
alert(filteredState)
dispatch(update_results(filteredProducts))
}

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
                <form>
                    <select ref = {inputBrand} className = "brandFilterBox" id="brandFilterBox" placeholder= "Select Brand" > 
                        <option value = "" >Select Brand</option>
                        {[brands]}
                    </select>
                </form>
            </div>
    </div>            
    <div>
            <div>
            <label for="dog-names">Filter by Category: </label>
            </div>
    </div>
    <div>
            <div>
            <select ref = {inputCategory} className = "categoryFilterBox" id="categoryFilterBox" placeholder= "Select Category">
                <option value=''>Select Category</option>
                {[categories]}
            </select>
            </div>
     </div>
     <div>
        <form><button id = 'filter-button' onClick = {()=> clickHandler()}>Filter Results</button></form>
     </div>
    </>
  );
};

export default FilterComponent;
