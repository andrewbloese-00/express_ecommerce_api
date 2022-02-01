const Product = require("../MongoDB/Models/Product")
/**
    Route:       /api/products
    Method:      GET 
    Data:        none
    Description: gets all products from the database
**/
exports.getProducts = async ( req , res , next) => {
    try { 
        const products = await Product.find({})
        if( !products ) {
            res.status(404).json({msg: 'Failed to find products!'})
        }
        //send the products 
        res.status(200).json({ data: products })

    } catch ( e ) {
        next( e )
    }
    
    Product.find({})

}
/**
    Route:       /api/products/:id
    Method:      GET 
    Data:        productID
    Description: searches the database for a product with the id provided in the requeset parameters 
    if it finds one it sends it with a 200 status code otherwise responds with 404 not found.
**/
exports.getProduct = async ( req , res , next ) => {

    //get product id from url params
    const productId = req.params.id;

    try{
        //find a product by the provided id
        const product  = await Product.findById( productId )
        if( !product ) { 
            res.status(404).json({msg: 'Failed to find product with that id '})
        }

        //send the product with a 200 status code

        res.status(200).json({ data: product })

    } catch ( e ) { 
        next( e )
    }
}

exports.createProduct = async ( req , res , next ) => { 

    //destructure request body
    const { name , imageUrl , description , price , inStock , tag , options } = req.body


    //validate inputs
    if( !name || !imageUrl || !description || !price || !inStock || !tag || !options) {
        res.status(401).json({msg: 'All fields must be filled'})
    }


    try {
        //create a product document with the provided data
        const product = await Product.create({
            name , 
            imageUrl , 
            description , 
            price , 
            inStock , 
            tag , 
            options
        })

        if( !product ) { 
            res.status(500).json({msg: 'ERROR creating product, try again!'})
        }
        
    } catch ( e ) { 
        next( e )
    }
}

exports.editProduct = async ( req , res , next ) => {
    //destructure request body 
    const { name , imageUrl , description , price , inStock , tag , options } = req.body
    try{
        //find product with id in params
        const product = await Product.findById(req.params.id)
        if( !product ) {
            res.status(404).json({ msg : 'No product found' })            
        }
        //update product
        product.name = name; 
        product.imageUrl = imageUrl;
        product.description = description; 
        product.price = price; 
        product.inStock  = inStock; 
        product.tag = tag; 
        product.options = options;

        //save changes
        await product.save()
    } catch( e ) { 
        next( e )
    }
}