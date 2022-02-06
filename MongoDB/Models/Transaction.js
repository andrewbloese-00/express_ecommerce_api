const mongoose = require('mongoose');
const ErrorResponse = require('../../utils/errorResponse');
const Order = require('./Order')

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
    customer_email: { 
        type: String , 
        required: [ true , 'Transaction must have a customer email']
    } 
})

TransactionSchema.methods.createOrderRef = async function (next) { 

    console.log(this.order_ref);
    if( !this.order_ref ) { 
        console.error('There was no order reference to create abort!')
        return next( new ErrorResponse('No order reference to add, aborting transaction create'))
    }

    

    let order = await Order.find({_id: this.order_ref});
    
    //set transaction ref and mark as paid
    order.transaction_ref = this._id;
    order.paid = true;

    //mark status as processing
    order.setStatus('Processing')
    await order.save()


}

const Transaction = mongoose.model('Transaction' , TransactionSchema);
module.exports = Transaction;