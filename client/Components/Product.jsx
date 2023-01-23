// This component lives inside the Results Display component. One each will be created for each returned result

import React from "react";

const Product = () => {
  return (
    <div>
      <img src="" /* We will get this image from state */></img>
      <h1>{/* we will get the product name from state*/}</h1>
      <h2>{/* we will get the brand name from state*/}</h2>
      <body>{/* we will get the ingredients from state*/}</body>
    </div>
  );
};

export default Product;
