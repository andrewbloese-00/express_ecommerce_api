const axios = require('axios').default;
const URL = 'http://localhost:8080'

const { productTemplate , orderTemplate , transactionTemplate } = require('./templates')


function outputError( error , route , method){ 
    console.log(`❌ ${method} Failed @ ${route} `)
    console.error(error)
}



async function testRequest( route , method , fields){ 
        
    const config = { 
        headers: {
           "Content-Type":"application/json"
        }
    }

    console.log(` === Testing ${method} @ ${route} ===`);

    
    let requestURL = `${URL}${route}`
    if(method === 'POST'){ 
        return
        try { 
            const { data } = await axios.post( requestURL , {...fields} , config)
            console.log('data',data)
            return data
        } catch ( e ) { outputError( e , route , method )}
    }

    if(method === 'GET'){
        try{
            const { data } = await axios.get( requestURL )
            console.log(data)
            return data
        } catch ( e ) { 
            outputError( e , route , method )
        }
    }
}

async function main( ){ 
// -- Product Routes -- 

// GET /api/products
await testRequest('/api/products' , 'GET', null)

// GET /api/products/:id
await testRequest('/api/products/61fc9a2054b75488f1ea5d40', 'GET' , null )

// POST /api/products/create
await testRequest('/api/products/create', 'POST' , productTemplate )

// --  Order Routes -- 
// GET /api/orders 
await testRequest('/api/orders/' , 'GET' , null)

// GET /api/orders/:id
await testRequest('/api/orders/61fe27d6da9c31dba90efdcb', 'GET' , null )

// POST /api/orders/create
await testRequest('/api/orders/create' , 'POST' , orderTemplate )

// -- Transaction Routes -- 
// Get /api/transactions/
await testRequest('/api/transactions/' , 'GET' , null );

// GET /api/transactions/61fe284cc1fc739e960bdd94
await testRequest('/api/transactions/61fe284cc1fc739e960bdd94' , 'GET' , null );


// POST /api/transactions/create
await testRequest('/api/transactions/create' , 'POST' , transactionTemplate)




}


main( )