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

TransactionSchema.methods.createOrderRef = async function ( next ) { 

    console.log(this.order_ref);
    if( !this.order_ref ) { 
        console.error('There was no order reference to create "Transaction" || abort!')
        return next( new ErrorResponse('No order reference to add, aborting transaction create'))
    }

    
    // retrieve order document from mongo
    let order = await Order.findById(`${this.order_ref}`)
    
    //update order.paid to true , create field if doesnt exist
    try{
        order.paid = true
    } catch ( error ) { 
        console.log(`Caught error:\n ${error.message.substring(0,200)} . . .`)
        order = { ...order , paid: true }
    }
    
    //add the transaction reference , creating field if it does not exist
    try{
        order.transaction_ref = `${this._id}`
    } catch( error ) { 
        console.log(`Caught error:\n ${error.message.substring(0,200)} . . .`)
        order = { ...order , transaction_ref: `${this.id}` }
    }
    
    //add the order_status , creating field if it does not exist
    try{
        order.order_status = "Processing"
    } catch( error ) { 
        console.log(`Caught error:\n ${error.message.substring(0,200)} . . .`)
        order = { ...order , order_status: "Processing" }
    }
    
    await order.save()
    
    console.log(
        `
        Order ${order._id} Updated With... 
        {
            "transaction_ref": ${order.transaction_ref},
            "paid" : ${order.paid}
        }
        `    
    )
        
    return
}

        


const Transaction = mongoose.model('Transaction' , TransactionSchema);
module.exports = Transaction;