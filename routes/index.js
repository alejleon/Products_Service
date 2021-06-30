var express = require('express');
var router = express.Router();
const db = require('../database')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("I hit it")
  res.render('index', { title: 'Express yeahhhh' });
});


// Products ////////////////////////////////
router.get('/products', (req, res) => {
  let params = req.query;

  db.getProducts(params, (err, products) => {
    if (err) {
      console.error(err)
    } else (
      res.json(products)
    )
  })
})


// ProductInfo //////////////////////////////
router.get('/products/:product_id', (req, res) => {
  let productId = req.params.product_id;

  db.getProductInfo(productId, (err, productInfo) => {
    if (err) {
      console.error(err)
    } else {
      res.json(productInfo)
    }
  })
})


// Styles ////////////////////////////////////
router.get('/products/:product_id/styles', (req, res) => {
  let productId = req.params.product_id;
  console.log(productId)

  db.getStyles(productId, (err, styles) => {
    if (err) {
      console.error(err)
    } else (
      res.json(styles)
    )
  })
})


router.get('/products/:product_id/related', (req, res) => {
  let productId = req.params.product_id;
  console.log(productId)

  db.getRelated(productId, (err, related) => {
    if (err) {
      console.error(err)
    } else {
      res.json(related)
    }
  })
})

module.exports = router;
