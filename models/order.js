const mongoose  = require('mongoose')

const orderModel = new mongoose.Schema([{
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

const Order = mongoose.model('Order', orderModel)
module.exports = Order;