const router = require('express').Router()
const otpController = require('../controllers/otpController')

//send otp
router.post('/send', otpController.send)

//verify otp
router.post('/verify', otpController.verify)

module.exports = router


