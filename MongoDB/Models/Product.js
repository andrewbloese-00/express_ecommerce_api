const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String, 
    imageUrl: String, 
    description: String, 
    price: Number, 
    inStock: Number , 
    tag: String, 
    options: [],
})

const Product = mongoose.model('Product' , ProductSchema)
module.exports = Product