const fetch = require('node-fetch');
require('dotenv').config({ path: './.env' });

module.exports = {
  getProductList: async (req, res, next) => {
    // console.log(req.body)
    //needs category id
    try {
      const url =
        'https://sephora.p.rapidapi.com/products/list?categoryId=cat1230034&pageSize=3';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
        },
      };
      const response = await fetch(url, options);
      res.locals.raw_product_list = await response.json();

      const { categoryId, products } = res.locals.raw_product_list;
      const category = {
        category_id: categoryId,
        product_list: [],
      };
      // console.log(category, products)
      for (let product of products) {
        const {
          productId,
          brandName,
          displayName,
          heroImage,
          rating,
          reviews,
        } = product;
        category.product_list.push({
          product_id: productId,
          brand_name: brandName,
          display_name: displayName,
          hero_image: heroImage,
          rating: rating,
          reviews: reviews,
        });
      }
      console.log(category);
      res.locals.CATEGORY = await category;
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

  getProductDetail: async (req, res, next) => {
    res.locals.CATEGORY = [];

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
      },
    };

    console.log('Product list in getProductDetail: ' + res.locals.PRODUCT_LIST);
    for (let i = 0; i < res.locals.PRODUCT_LIST.length; i++) {
      console.log('ran getProductDetail');
      const product = res.locals.PRODUCT_LIST[i];
      const { product_id, brand_name, display_name } = product;

      const url = `https://sephora.p.rapidapi.com/products/detail?productId=${product_id}&preferedSku=2210607`;
      const response = await fetch(url, options);
      const productDetail = await response.json();

      // Two data that I want
      // Want to add this category to my product
      const { ingredientDesc, displayName } = productDetail.currentSku;
      const category = productDetail.parentCategory.displayName;

      // console.log('Ingredients:');
      // console.log(ingredientDesc);

      // console.log("Product's details:");
      // console.log(displayName);

      // TODO in the future
      // Want to parse these ingredients
      // console.log("Product's category:");
      // console.log(category);

      // create new list of subproducts
      const newProduct = {
        ...product,
        sub_product_list: [
          { variant: displayName, ingredient: ingredientDesc },
        ],
      };

      res.locals.CATEGORY.push(newProduct);
    }

    return next();
  },
};
