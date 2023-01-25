// This component lives on the results page and displays one Product component for each product

import React from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';

const ResultsPage_Container = () => {
  // array from state with all results from relevant DB query
  const productList = useSelector((state) => state.products.results);
  // generate one Market component for each product
  const products = [];
  for (let i = 0; i < productList.length; i++) {
    products.push(<Product id={productList[i].product_id}/>);
  }
  // render all products
  return (
    <div className="productCard">
      {products}
    </div>
  );
};

export default ResultsPage_Container;
