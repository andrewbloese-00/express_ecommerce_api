const express = require('express')
const router = express.Router()

const { getUser } = require('../controllers/user_controller')
const { protect } = require('../middleware/auth_protect')


router.route('/').get( protect , getUser )



module.exports = router