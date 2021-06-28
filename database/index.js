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

const Products = mongoose.model('Products', productsSchema, 'products');
const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);
const Styles = mongoose.model('Styles', stylesSchema);
const Related = mongoose.model('Related', relatedSchema);


///////////////////////////////////////
// Query functions ////////////////////
const getProducts = (params, callback) => {
  let count = params.count || 5;

  Products.find((err, documents) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, documents)
    }
  })
  .limit(Number(count))
}


const getProductInfo = (params, callback) => {
  ProductInfo.find({id: params.id})
}


const getStyles = (params, callback) => {
  let query = '' //////////////////////////TBD
}


const getRelated = (params, callback) => {
  let query = '' //////////////////////////TBD
}


module.exports = {
  getProducts,
  getProductInfo,
  getStyles,
  getRelated
};