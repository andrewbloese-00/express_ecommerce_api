require('dotenv').config();
const express = require('express')
const { path } = require('express/lib/application');
const { herokuCheck } = require('./middleware/herokuCheck');
const errorHandler = require('./middleware/error');

//init the express server
const app = express();

//connect to MongoDB
const connectMongo = require('./MongoDB/connect');
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
app.use('/api/stripe_access/' , require('./routes/stripe_routes'))

//check if the app is in deployment and apply changes  
herokuCheck( app )

//apply error handling middleware last
app.use( errorHandler )


const PORT = process.env.PORT || 8080
const server = app.listen( PORT , () => console.log(`🚀 Server Launched Successfully On Port ${PORT}`));

//listen for errors on server
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


