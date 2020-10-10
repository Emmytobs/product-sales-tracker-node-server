const mongoose  = require('mongoose')

const orderModel = new mongoose.Schema({
    details: [{
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
        quantity: {
            type: Number,
            trim: true,
            required: true
        }
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderModel)
module.exports = Order;