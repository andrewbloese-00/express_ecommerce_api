const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    amount: {
        type: Number , 
        required: [true , 'Order must have a total']
    },
    created_on: {
        type: Date,
        required: [true , 'Order must have a date']
    },
    items: {
        type: [],
        required: [true, 'Order must have items in it'],
    },

    shipping_address: {
        type: String,
        required: [ true , 'Order must have shipping address']
    },
    shipping_state: {
        type: String,
        required: [ true , 'Order must have shipping state']
    },
    shipping_city: {
        type: String,
        required: [ true , 'Order must have shipping city']
    },
    shipping_zip: {
        type: String, 
        required:  [ true , 'Order must have shipping zip'] , 
    },
    transaction_ref: {
        type: String,
        required: [ true , 'Order must have a reference to a transaction document']
    }
})

const Order = mongoose.model('Order' , OrderSchema);
module.exports = Order;