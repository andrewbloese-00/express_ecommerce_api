const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    order_ref: {
        type: String,
        required: [true , 'Transaction must contain a reference to an order'],
    } , 
    subtotal: {
        type: Number,
        required: [true , 'Transaction must have a subtotal'],
    },
    tax: { 
        type: Number , 
        required: [ true , 'Transaction Must have tax'],
    },
    total: { 
        type: Number , 
        required: [ true , 'Transaction must have total'],
    },
    created_on: {
        type: Date ,
        required: [ true , 'Transaction must have a date'] 
    },
    customerEmail: { 
        type: String , 
        required: [ true , 'Transaction must have a customer email']
    } 
})

const Transaction = mongoose.model('Transaction' , TransactionSchema);
module.exports = Transaction;