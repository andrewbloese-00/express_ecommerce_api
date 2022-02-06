const Transaction = require('../MongoDB/Models/Transaction')
const { resError } = require('../utils/responses')

exports.getTransactions = async ( req , res , next ) => {
    try {
        //get all transactions from the database
        const transactions = await Transaction.find({})
        if( !transactions ){
            resError( res , 404 , 'No Transactions Found' )
        }

        //respond with json of transactions
        res.json({ data: transactions })

    } catch ( e ) { 
        next( e )
    }
} 
exports.getTransaction = async ( req , res , next ) => {
    try {
        //get transaction id from either url params 
        const transactionId = req.params.id 

        if( !transactionId ){
            resError( res , 401 , 'No id provided to search for a transaction')
        }

        const transaction = await Transaction.findById( transactionId )

        if( !transaction) { 
            resError( res , 404 , `No transaction found with id: ${transactionId}`)
        }


    } catch ( e ) { 
        next( e )
    }
} 

exports.createTransaction = async ( req , res , next ) => {

    const { order_ref , subtotal , tax , total , customer_email } = req.body
    const created_on = new Date() 


    try {
        const transaction = await Transaction.create({
            order_ref , 
            subtotal , 
            tax , 
            total , 
            created_on ,
            customer_email,
        })

        if( !transaction ) { 
            resError( res , 500 , 'Failed to create a transaction for this ')
        }

        //add the transaction reference to the 
        transaction.createOrderRef( next )
        

        res.status(200).json({
            msg: `Transaction ${transaction._id}` ,
            data: transaction
        })

    } catch ( e ) { 
        next( e )
    }
} 
