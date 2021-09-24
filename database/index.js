const mongoose = require('mongoose');
// const newDB = require('../app.js')


mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true, useUnifiedTopology: true})

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
  id: Number,
  related: [Number]
})


///////////////////////////////////////
// Models /////////////////////////////

const Products = mongoose.model('Product', productsSchema, 'products');
const ProductInfo = mongoose.model('ProductInfo', productInfoSchema, 'product_info');
const Styles = mongoose.model('Style', stylesSchema, 'styles');
const Related = mongoose.model('Related_product', relatedSchema, 'related_products');


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




// mongoimport --db=products --collection=photos --type=csv --drop --headerline --stopOnError --file=/home/al/linux/Products_Service/database/data/photos.csv
