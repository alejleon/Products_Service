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
  let params = req.query;

  db.getProductInfo(params, (err, productInfo) => {
    if (err) {
      console.error(err)
    } else {
      res.json(productInfo)
    }
  })
})


// Styles ////////////////////////////////////
router.get('/products/:product_id/styles', (req, res) => {
  let params = req.query;

  db.getStyles(params, (err, styles) => {
    if (err) {
      console.error(err)
    } else (
      res.json(styles)
    )
  })
})


router.get('/products/:product_id/related', (req, res) => {
  let params = req.query;

  db.getRelated(params, (err, related) => {
    if (err) {
      console.error(err)
    } else {
      res.json(related)
    }
  })
})

module.exports = router;
