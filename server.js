require('dotenv').config();
const errorHandler = require('./middleware/error');

const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//init the express server
const app = express();

//connect to MongoDB
const connectMongo = require('./MongoDB/connect');
const { path } = require('express/lib/application');
connectMongo()


//middleware
app.use(express.json());
app.use(cors())

//routes
app.use('/api/auth/' , require('./routes/auth_routes'))
app.use('/api/products/' , require('./routes/product_routes'))
app.use('/api/orders/' , require('./routes/order_routes'))
app.use('/api/transactions/' , require('./routes/transaction_routes'))
app.use('/api/users/' , require('./routes/user_routes'))

//stripe api call at 'api/payment'
app.post('/api/payment' , cors() , async ( req , res ) => {
   await doStripe( req , res )
}) 


//add static files after heroku build
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*' , ( req , res ) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
    })
}


app.use(errorHandler)

const PORT = process.env.PORT || 8080
const server = app.listen( PORT , () => console.log(`🚀 Server Launched Successfully On Port ${PORT}`));
server.addListener('error', ( error ) => {
    //Notify fail , prompt for error message
    //for error message prompt
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    })  

    console.error(`❌ Server Failed to Start on Port ${PORT}`)
    readline.question("Would you like to view the error message? ", ( res ) => {
    if(res === 'Y' || res === 'y'){
        console.error( error )
    }
    process.exit(1)
})
})


const doStripe = async ( req , res ) => {
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
     res.status(200).json({
         message: 'Payment Successful',
         success: true , 
         data: payment
     })

 } catch ( e ){

     //on error send success: false and a message
     res.json({
         message: 'Payment FAILED!',
         success: false,
     })
 }
}