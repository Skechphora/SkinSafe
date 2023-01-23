// This component lives on the results page and displays one Product component for each product

import React from "react";
import Product from "./Product.jsx";

const ResultsPage_Container = () => {
  // array from state with each result from relevant DB query
  const productList = [];
  // generate one Market component for each product
  const products = [];
  for (let i = 0; i < shortHand.length; i++) {
    products.push(<Product />);
  }
  // render all products
  return <div>{[products]}</div>;
};

export default ResultsPage_Container;
