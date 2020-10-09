const mongoose  = require('mongoose')

const productModel = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: true,
    },
    size: {
        type: String,
        trim: true,
        required: true
    }, 
    price: {
        type: Number,
        trim: true,
        required: true
    }
}], {
    timestamps: true
})

const Product = mongoose.model('Product', productModel)
module.exports = Product;