const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.stripePayment = async ( req , res ) => {
    //get amount a payment method from body
    const { amount , id } = req.body; 
    try{ 
        //try to create a stripe payment 
        const payment = await stripe.paymentIntents.create({ 
            amount,
            currency: "USD",
            descripyion: "Test payment",
            payment_method: id,
            confirm: true,
        })
   
   
        //on success we will res with success and the payment data
       return res.status(200).json({
            message: 'Payment Successful',
            success: true , 
            data: payment
        })
   
    } catch ( e ) {
   
        //on error send success: false and a message
        res.json({
            message: 'Payment FAILED!',
            success: false,
        })

        console.log( e )
    }
   }