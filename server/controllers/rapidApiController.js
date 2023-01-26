const fetch = require('node-fetch');
require('dotenv').config({ path: './.env' });

module.exports = {
  // Product list API call

  fetchProductList: async (req, res, next) => {
    try {
      const url =
        'https://sephora.p.rapidapi.com/products/list?categoryId=cat150006&pageSize=20&currentPage=1';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      const { products } = data;

      const PRODUCTS = [];

      for (let product of products) {
        const formatedProduct = {
          product_id: product.productId,
          product_name: product.displayName,
          brand_id: product.brandName,
          category_id: 0,
          hero_image: product.heroImage,
          target_url: product.targetUrl,
          rating: product.rating,
          review: product.reviews,
        };

        PRODUCTS.push(formatedProduct);
      }

      res.locals.PRODUCTS = await PRODUCTS;
      return next();
    } catch (err) {
      const error = {
        log: `rapidApiController.getProductList error ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        status: 400,
        message: `rapidApiController.getProductList error check server log`,
      };
      console.error('error:' + err);
    }
  },

  // Products'details API call

  fetchProductDetail: async (req, res, next) => {
    res.locals.DETAILS = [];

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
      },
    };

    for (const [i, product] of res.locals.PRODUCTS.entries()) {
      const { product_id } = product;

      const url = `https://sephora.p.rapidapi.com/products/detail?productId=${product_id}&preferedSku=2210607`;
      const response = await fetch(url, options);
      const productDetail = await response.json();

      // Two data that I want
      // Want to add this category to my product
      //
      const { ingredientDesc } = productDetail.currentSku;
      const category = productDetail.parentCategory.displayName;

      // create new list of subproducts
      const newProduct = {
        ...product,
        category_id: category,
        ingredients: ingredientDesc,
      };

      res.locals.DETAILS.push(newProduct);
    }

    // console.log(res.locals.DETAILS);
    return next();
  },
};
