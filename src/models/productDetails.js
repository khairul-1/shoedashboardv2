// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');

// const productSchema = new Schema({
//   productName: { type: String, required: true },
//   productPrice: { type: Number, required: true },
//   productQuantity: { type: Number, required: true },
//   releaseDate: { type: Date, required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   style: { type: String, required: true },
//   size: [{ type: String }],
//   color: [{ type: String }],
//   material: { type: String, required: true },
// });

// const Product = mongoose.model('ProductDetails', productSchema);

// module.exports = Product;

const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

// const productSchema = new Schema(
//   {
//     productName: { type: String, required: true },
//     productPrice: { type: Number, required: true },
//     productQuantity: { type: Number, required: true },
//     releaseDate: { type: Date, required: true },
//     brand: { type: String, required: true },
//     model: { type: String, required: true },
//     style: { type: String, required: true },
//     size: [{ type: String }],
//     color: [{ type: String }],
//     material: { type: String, required: true },
//   },
//   { collection: 'ProductDetails' },
// ); // Specify the collection name here

const productSchema = new Schema(
  {
    ProductName: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    ProductQuantity: { type: Number, required: true },
    ReleaseDate: { type: Date, required: true },
    Brand: { type: String, required: true },
    Model: { type: String, required: true },
    Style: { type: String, required: true },
    Size: [{ type: String }],
    Color: [{ type: String }],
    Material: { type: String, required: true },
  },
  { collection: 'ProductDetails' },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
