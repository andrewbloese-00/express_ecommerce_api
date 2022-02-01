const mongoose = require('mongoose')
const User = require('../MongoDB/Models/User')
const { resError } = require('../utils/responses')

/**
    Route:       /api/auth/register
    Method:      POST 
    Data:        name , email , password , passwordConfirm 
    Description: creates a user in the database with a provided name , email and password. 
                 the password is encrypted before being saved ( handled by mongoose )
**/
exports.register = async ( req , res , next ) => {

    //destructure request body 
    const { name , email , password , passwordConfirm } = req.body
    
    //validate inputs (on fail respond with an error and message )
    if( password !== passwordConfirm ) { 
        resError( res , 401 , 'Passwords Must Match!')
    }

    if( !password || !name || !email  ) {
        resError( res , 401 , 'All required inputs must be filled to create an account')
    }

    //check if a user exists with email already
    if( User.findOne({ email: email })){
        resError( res , 401 , `An account already exists associated with the email ${email}`)
    }

    // inputs are valid , create a user document
    const user = await User.create({
        name , 
        email , 
        password ,
        passwordConfirm, 
        created_on: ( new Date()).toString()
    })

    // try to save the user to database
    try{
        await user.save()
        sendToken(user , 201 , res)
    } catch ( error ) { 
        next( error )
    }
} //end register

/**
    Route:       /api/auth/login
    Method:      POST 
    Data:        email , password 
    Description: finds a user associated with provided email and then checks if the provided password
                 matches. If it does it responds with a JSON webtoken and the user data. If the password 
                 does not match , then respond with an error. 
**/
exports.login = async ( req , res , next ) => {
    
    //destructure request body
    const { email , password } = req.body

    //validate inputs
    if( !email || !password ) {
        resError( res , 401 , "All inputs must be filled!")
    }

    //try to find the user associated with email address
    const user = User.findOne({ email : email })

    //if the password provided matches then we send the token 
    if( user.matchPassword( password )) { 
        sendToken( user , 201 , res )
    }

    resError( res , 401 , 'Invalid Credentials! ')
}//end login



exports.forgotPassword = async ( req , res , next ) => { 

}

exports.resetPassword = async ( req , res , next ) => { 

}

//helpers
const sendToken = async ( user , statusCode , res ) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token, user});

}

