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
    paid: {
        type: Boolean,
        required: [true, 'Order must have \"paid\" flag']
    },
    transaction_ref:{
        type: String
    },
    order_status: {
        type: String,
        default: "Awaiting Payment"
    }
})


const Order = mongoose.model('Order' , OrderSchema);





module.exports = Order;
