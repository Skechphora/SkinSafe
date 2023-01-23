const express = require('express')
const transControl = require('../controllers/pgDBController.js')
const apiControl = require('../controllers/rapidApiController.js')
const router = express.Router()

// transControl.transIngr, transControl.saveIngr,
// transControl.getProduct_list,
router.get('/ing',transControl.getProduct_list, apiControl.getProductDetail, transControl.transIngr, transControl.saveIngr, transControl.saveSub_product, transControl.JointTable, (req,res)=> {
  res.send('action happened')
})

router.get('/product_list',apiControl.getProductList, transControl.transP_list, (req,res)=> {
  res.send('action fulfilled')
})




module.exports = router;
