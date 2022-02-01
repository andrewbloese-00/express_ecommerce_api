const Order = require('../MongoDB/Models/Order')
const { resError } = require('../utils/responses')

exports.getOrders = async ( req , res , next ) => { 
    try {
        const orders = await Order.find({});
        res.json({ data: orders });
    } catch ( e ) {
        next( e );
    }
}
exports.getOrder = async ( req , res , next ) => { 
    try {
        const orderId = req.param.id;
        if( !orderId ){ 
            resError( res , 401 , 'No order id provided')
        }

        const order = await Order.findById({ orderId })
        if( !order ) { 
            resError( res , 404 , `No order found with the id ${orderId}`)
        }

        res.json({ data : order})

    } catch ( e ) {
        next( e );
    }
    
}
exports.createOrder = async ( req , res , next ) => { 
    const { amount , items , shipping_address , shipping_state , shipping_city , shipping_zip , transaction_ref } = req.body
    const created_on = Date.now()

    if( !amount || !items || !shipping_address || !shipping_state || !shipping_city || !shipping_zip || !transaction_ref) {
        resError(res , 401 , 'All data must be provided for an order to be created!')
    }

    try {
        const order = await Order.create({
            amount,
            created_on,
            items, 
            shipping_address,
            shipping_state,
            shipping_city,
            shipping_zip,
            transaction_ref,
        })

        if(!order) {
            resError( res , 500 , 'Failed to create an order')
        }
        
    } catch ( e ) {
        next( e )
    }
}



