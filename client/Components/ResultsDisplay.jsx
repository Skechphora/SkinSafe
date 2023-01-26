// This component lives on the results page and displays one Product component for each product
import React from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';

const ResultsPage_Container = () => {
  // array from state with all results from relevant DB query
  const productList = useSelector((state) => state.products.results);

  // generate one Market component for each product object in our productList array
  const products = [];
  for (let i = 0; i < productList.length; i++) {
    // assign props here to prop-drill down just one component
    // easier to prop-drill than leverage 'useSelector' on the 'Product' component to extract info we need per product
    products.push(
      <Product 
        key={productList[i]._id}
        brandId={productList[i].brand_id} 
        imgSrc={productList[i].hero_image}
        productName={productList[i].product_name}  
        ingredients={productList[i].ingredients}
        urlLink={productList[i].target_url} 
      />);
  }
  // render all products
  return (
    <div id="product-container">
      {products}
    </div>
  );
};

export default ResultsPage_Container;
