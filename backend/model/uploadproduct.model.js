const mongoose = require('mongoose')

const uploadProductSchema = new mongoose.Schema({
    name : String,
    description :  String ,
    price :  Number,
    category : String, 
    image :  String
},{
    timestamps : true
})

const ProductModel = mongoose.model('product',uploadProductSchema)

module.exports = ProductModel