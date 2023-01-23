const pgSql = require('../models/pgSqlDatabase.js')

module.exports = {
  getProduct_list: async (req,res,next) => {
    console.log('ran getProdcut_list')
    try{
    const command = "SELECT * FROM product_list"
    const sqlResponse = await pgSql.query(command);
    const product_list = sqlResponse.rows;
    res.locals.PRODUCT_LIST = product_list
    // console.log(res.locals.PRODUCT_LIST);
    return next()
  }catch(err) {
    console.log(err)
    return next(err)
  }
  },
  //////// STILL NEEDS TO LINK TO RAPID API PLEASE COME BACK TO IT 
  // THIS WHERE RES.LOCALS.CATEGORY COMES TO  THIS MUST BE CHAINED WITH GETPRODUCTDETAIL MIDDLEWARE
transIngr: async (req,res,next) =>{
  res.locals.SORTED_CATEGORY = []
for (let PRODUCT of res.locals.CATEGORY) {
  const sub_product_list = {display_name: undefined,
    ingredient:[]}
    console.log(PRODUCT)
  const {product_id, brand_name, display_name, hero_image, rating, reviews} = PRODUCT
  for (let {ingredient, display_name} of PRODUCT.sub_product_list) {
    // this is for testing whem the test is done change the source of the data back to rapid api
    //****************************** MAKE SURE TO GET A INGREDIENTS FROM PREVIOUS FUCNTION  *********************/
    sub_product_list.display_name = display_name
    if (ingredient !== undefined) {
    const sort1 = ingredient.split(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g)
    // console.log(sort1)
    const sort2 = [];
    for (let str of sort1) {
      // sort2.push(str.replace(/ /, ""))
      const str1 = str.split(/, /)
      sort2.push(...str1)
    }
    // console.log(sort2)
    // const sort3 = []
    for (let str of sort2) {
      const [name, description] = str.split(/: /)
      
      if (name.length){
        sub_product_list.ingredient.push({
          ingredient: name,
          description: description
        })
      }
    }
  }
    // console.log(sub_product_list)
  }
  res.locals.SORTED_CATEGORY.push({
    product_id: product_id,
    brand_name: brand_name,
    display_name: display_name,
    hero_image: hero_image,
    rating: rating,
    reviews: reviews,
    sub_product_list: sub_product_list
  })
}
// console.log(res.locals.SORTED_CATEGORY)
return next()
},

saveIngr: async (req,res,next) => {
  try{
    console.log('ran save Ingr')
    const command = `INSERT INTO ingredient_list (ingredient, description) VALUES ($1, $2) ON CONFLICT (ingredient) DO NOTHING;` //
    console.log(res.locals.SORTED_CATEGORY)
    for (let PRODUCT of res.locals.SORTED_CATEGORY) {

      const {product_id, brand_name, display_name,  hero_image, rating, reviews, sub_product_list} = PRODUCT
      // {ingredient_list }
      // console.log(sub_product_list)
      // console.log()
        // const text = `SELECT * FROM ingredient_list`
        // console.log(res.locals.INGREDIENT_LIST)
        for (let ele of sub_product_list.ingredient) {
          const {ingredient, description} = ele
          // console.log(ingredient, description)
          // const result = await pgSql.query(text)
          const result = await pgSql.query(command, [ingredient, description ? description : null]);
          // console.log(result)
          // res.locals.result = result;
        }
    }
    return next()
  }catch(err ) {
    const error = {
      log: `pgDBController.saveIngr ERROR::${JSON.stringify(err)}`,
      message: `server error check the server log`
    }
    next(error)
  }
},

saveSub_product: async (req,res,next)=> {
  
  for (let PRODUCT of res.locals.SORTED_CATEGORY) {

    const {product_id, brand_name, display_name,  hero_image, rating, reviews, sub_product_list} = PRODUCT
    const result = await pgSql.query(`INSERT INTO sub_product (sub_product_id, display_name, hero_image, rating, reviews, product_id) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING`,
                  [product_id+'::'+sub_product_list.display_name, sub_product_list.display_name, hero_image, rating, reviews, product_id])
    console.log(result)
  }
  return next()
},

JointTable: async(req,res,next) => {

  const commandJoint = `INSERT INTO product_ingredient ( sub_product_id, ingredient_id) VALUES ((SELECT sub_product_id FROM sub_product WHERE sub_product_id=$1),(SELECT _id FROM ingredient_list WHERE ingredient=$2)) ON CONFLICT DO NOTHING`

  for (let PRODUCT of res.locals.SORTED_CATEGORY) {

    const {product_id, brand_name, display_name,  hero_image, rating, reviews, sub_product_list} = PRODUCT

      for (let ele of sub_product_list.ingredient) {
        const {ingredient} = ele
        // const ingredient_id = await pgSql.query(`SELECT _id FROM ingredient_list WHERE ingredient = $1;`, [ingredient])
        // console.log(ingredient_id.rows[0]._id)

        if (product_id && sub_product_list.display_name) {
          console.log(product_id, sub_product_list.display_name)
          const jointResult = await pgSql.query(commandJoint, [ product_id+"::"+ sub_product_list.display_name, ingredient ])
          console.log(jointResult)
          console.log('ran saveIngr')}
      }
  }
  return next();
},
  transP_list : async(req, res, next) => {
  try {
    const Category = await res.locals.CATEGORY;
    console.log(Category)
    const command = "INSERT INTO product_list (product_id, brand_name, display_name, hero_image, rating, reviews) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;"
    for (let product of Category.product_list) {
      const {product_id, brand_name, display_name, hero_image, rating, reviews} = product;
      const params = [product_id, brand_name, display_name, hero_image, rating, reviews]
      console.log(params)
      const result = await pgSql.query(command, params);
      console.log(result)
    }
    return next()
  }catch(err) {
    console.log(err)
  }
}
}
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);