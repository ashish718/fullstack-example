const router = require('express').Router()
const userController = require('../controllers/userController')
const {verify} = require('../gateway/auth')

//create user profile
router.post('/add', userController.userCreate)

//update user profile
router.post('/update', userController.updateUser)

//get user profile detail
router.get('/detail', userController.getUser)

//add user login
router.post('/login/add', userController.userLogin)

//get user login
router.get('/login', userController.getUserLogin)

//add user transaction
router.post('/transaction/add', userController.userTransaction)

//get user transaction
router.get('/transaction', userController.getUserTransaction)

module.exports = router


