const express = require('express')
const { getTransaction, getTransactions , createTransaction } = require('../controllers/transaction_controller')


const router = express.Router()

router.get( '/' , getTransactions )
router.get( '/:id' , getTransaction )
router.route('/create').post(createTransaction);


module.exports = router