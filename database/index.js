const mongoose = require('mongoose');
// const newDB = require('../app.js')


mongoose.connect('mongodb://localhost:27017/product_services', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('connected to mongoose!')
})


////////////////////////////////////
// Schemas /////////////////////////

const productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String
})

const productInfoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String
    }
  ]
})

const stylesSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      "default?": Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: {
        sku_id: {
          quantity: Number,
          size: String
        }
      }
    }
  ]
})

const relatedSchema = new mongoose.Schema({
  product_id: [
    Number
  ]
})


///////////////////////////////////////
// Models /////////////////////////////

const Products = mongoose.model('Product', productsSchema);
const ProductInfo = mongoose.model('ProductInfo', productInfoSchema, 'productInfo');
const Styles = mongoose.model('Style', stylesSchema, 'Styles');
const Related = mongoose.model('RelatedWIP', relatedSchema, 'relatedWIP');


///////////////////////////////////////
// Query functions ////////////////////
const getProducts = (params, callback) => {
  let page = Number(params.page) || 1;
  let count = Number(params.count) || 5;
  let pageSkip = (page * count) - count;

  Products.find((err, products) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, products)
    }
  })
  .skip(pageSkip)
  .limit(count)
}


const getProductInfo = (productId, callback) => {
  ProductInfo.find({id: productId}, (err, product) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, product)
    }
  })
}


const getStyles = (productId, callback) => {
  Styles.find({id: Number(productId)}, (err, styles) => { /////////////TODO
    if (err) {
      callback(err, null)
    } else {
      callback(null, styles)
    }
  })
}


const getRelated = (productId, callback) => {
  console.log(productId, typeof productId)
  Related.find({id: Number(productId)}, (err, related) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, related)
    }
  })
}


module.exports = {
  getProducts,
  getProductInfo,
  getStyles,
  getRelated
};