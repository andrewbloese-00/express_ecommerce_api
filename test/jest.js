const app = require('../server');
const { User , Product , Order , Transaction } = require('../MongoDB/Models/exports')



app.listen( 5000 , () => { 
    console.log("Test Server Started")
})