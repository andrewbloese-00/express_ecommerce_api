const express = require('express');
const cors = require('cors')
const router = express.Router()

const stripePayment = require('../controllers/stripe_controller')

router.post('/payment' , cors() , async ( req , res ) => stripePayment( req , res ))

module.exports = router


