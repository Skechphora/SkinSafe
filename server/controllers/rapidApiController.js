
const fetch = require('node-fetch');
require('dotenv').config({ path: './.env' });

module.exports = {
  getProductList: async (req,res,next) => {
    // console.log(req.body)
    //needs category id 
    try{
      const url = 'https://sephora.p.rapidapi.com/products/list?categoryId=cat1230034&pageSize=30&currentPage=1';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }};
      const response = await fetch(url, options)
      res.locals.raw_product_list = await response.json()
        // res.locals.raw_product_list = req.body
      const {categoryId, products} = res.locals.raw_product_list
      const category = {
        category_id: categoryId,
        product_list: []
      }
      // console.log(category, products)
      for (let product of products) {
        const {productId, brandName, displayName, heroImage, rating, reviews} = product;
        category.product_list.push({
          product_id: productId,
          brand_name: brandName,
          display_name: displayName,
          hero_image: heroImage,
          rating: rating,
          reviews: reviews
        })
      }
      // console.log(category)
      res.locals.CATEGORY = await category
      return next()
    }catch(err) {
      const error = {
        log: `rapidApiController.getProductList error ${typeof err === 'object'? JSON.stringify(err) : err}`,
        status: 400,
        message: `rapidApiController.getProductList error check server log`
      }
      console.error('error:' + err)
    }
  },

  getProductDetail: async (req,res,next) => {

    res.locals.CATEGORY = []


    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
    };

    for (let i = 0; i < res.locals.PRODUCT_LIST.length; i++) {
      // for (let product of res.locals.PRODUCT_LIST) {
        console.log('ran getProductDetail')
      const product = res.locals.PRODUCT_LIST[i]
    const {product_id, brand_name, display_name, hero_image, rating, reviews} = product
    
    const url = `https://sephora.p.rapidapi.com/products/detail?productId=${product_id}&preferedSku=2210607`;

    const response = await fetch(url, options)
    // console.log(response)
    const productDetail = await response.json();
    // console.log(productDetail)

    const firstName = productDetail.currentSku.displayName

    // create new list of subproducts
    const newProduct = {
      product_id: product_id,
      brand_name: brand_name,
      display_name: display_name,
      hero_image: hero_image,
      rating: rating,
      reviews: reviews,
      sub_product_list: []
    }

    // first sub_product aka currentSku is pushed into the subproduct array

    newProduct.sub_product_list.push({
      display_name: brand_name + " "+ display_name,
      variant: firstName,
      ingredient: productDetail.currentSku.ingredientDesc
    })


    console.log(productDetail.regularChildSkus)
    if (productDetail.regularChildSkus)
    for (let Sku of productDetail.regularChildSkus) {
      const {displayName, ingredientDesc} = Sku
      
      newProduct.sub_product_list.push({
        display_name: brand_name + " "+ display_name,
        variant: displayName,
        ingredient: ingredientDesc
      })
    }
    res.locals.CATEGORY.push(newProduct)
  }
  // console.log(res.locals.CATEGORY)
  // res.locals.PRODUCTS = newProduct
  // console.log(res.locals.PRODUCTS) 
  return next()
  }


}