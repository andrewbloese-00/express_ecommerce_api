const express = require('express')
const { getOrder, getOrders , createOrder } = require('../controllers/order_controller')


const router = express.Router()

router.get( '/' , getOrders )
router.get( '/:id' , getOrder )
router.post( '/create ' , createOrder )


module.exports = router