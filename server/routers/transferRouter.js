const express = require('express');
const transControl = require('../controllers/pgDBController.js');
const apiControl = require('../controllers/rapidApiController.js');
const pgSql = require('../models/pgSqlDatabase.js');
const router = express.Router();

router.get(
  '/products',
  apiControl.fetchProductList,
  transControl.extractBrandID,
  apiControl.fetchProductDetail,
  transControl.extractIngredients,
  transControl.extractCategoryID,
  transControl.insertProducts,
  transControl.insertIngredients,
  transControl.insertProductIngredientJoinTable,
  (req, res) => {
    res.send('action fulfilled');
  }
);

module.exports = router;
