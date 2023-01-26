const express = require('express');
const transControl = require('../controllers/pgDBController.js');
const apiControl = require('../controllers/rapidApiController.js');
const pgSql = require('../models/pgSqlDatabase.js');
const router = express.Router();

router.get(
  '/products',
  apiControl.getProductList,
  transControl.getBrandID,
  apiControl.getProductDetail,
  transControl.transformIngredients,
  transControl.getCategoryID,
  transControl.transP_list,
  transControl.saveIngredients,
  // transControl.jointTable,
  (req, res) => {
    res.send('action fulfilled');
  }
);

module.exports = router;
