const axios = require('axios').default;
const URL = 'http://localhost:8080'
const fs = require('fs')

const { productTemplate , orderTemplate , transactionTemplate } = require('./templates')


function outputError( error , route , method){ 
    console.log(`❌ ${method} Failed @ ${route} `)
    console.error(error)
}


function TestResponse( route , method , data ){ 
    return {
        route: route,
        method: method,
        data: data
    }
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
        //return TestResponse( route , method , {flag: 'Test Ignored , NULL'}); //currently dont want to test post routes
        // if( !requestURL.includes('/api/transactions/') ) return
        
        try { 
            const { data } = await axios.post( requestURL , {...fields} , config)
            console.log('data',data)
            return TestResponse( route , method , data)
        } catch ( e ) { outputError( e , route , method )}
    }

    if(method === 'GET'){
        try{
            const { data } = await axios.get( requestURL )
            return TestResponse( route , method , data )
        } catch ( e ) { 
            outputError( e , route , method )
        }
    }
}

async function main( ){ 

let tests = [];

// -- Product Routes -- 

// GET /api/products
tests.push(await testRequest('/api/products' , 'GET', null))

// GET /api/products/:id
tests.push(await testRequest('/api/products/61fc9a2054b75488f1ea5d40', 'GET' , null ))

// POST /api/products/create
tests.push(await testRequest('/api/products/create', 'POST' , productTemplate ))

// --  Order Routes -- 
// GET /api/orders 
tests.push(await testRequest('/api/orders/' , 'GET' , null))

// GET /api/orders/:id
tests.push(await testRequest('/api/orders/62001ab7ba5ba0c905b27b0a', 'GET' , null ))

// POST /api/orders/create
tests.push(await testRequest('/api/orders/create' , 'POST' , orderTemplate ))

// -- Transaction Routes -- 
// Get /api/transactions/
tests.push(await testRequest('/api/transactions/' , 'GET' , null ))

// GET /api/transactions/61fe284cc1fc739e960bdd94
tests.push(await testRequest('/api/transactions/6200202ecf19b508ed33d6c7' , 'GET' , null ))


// POST /api/transactions/create
tests.push(await testRequest('/api/transactions/create' , 'POST' , transactionTemplate ))


console.log( 'tests' , tests);

//run report 
testReport( tests )
}


function testReport( testArr ) {

    const entries = testArr.map( item => JSON.stringify( item , null , 4));
    let output = "";
    entries.forEach( entry =>  output+= entry )

    fs.writeFile('testreport.txt', output , 'utf-8' , err => console.error(err));
}

//function to check if property is contained in some set of object fields
function hasProperty( fields , property ){
    if( !fields || !property ) return false
    return Object.hasOwnProperty.bind(fields)(`${property}`) 

}

main( )

