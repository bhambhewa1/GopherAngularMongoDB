const express = require('express');
const router = express.Router();
const HomeController = require('../Controllers/HomeController')
const {UserRegisteration,UserLogin} = require('../Controllers/UsersController')
const {verifyRegisterationEmailOTP,resendRegisterationEmailOTP} = require('../Controllers/Middlewares/UserRegisterationEmailOTP')
const DeleteController = require('../Controllers/DeleteController')
const {authLogin} = require('../Controllers/Middlewares/verifyLoginController')
const Category = require('../Pages/greetingCards/Category')

router.post('/',HomeController);
router.post('/user',UserRegisteration)
router.post('/user/emailOTP',verifyRegisterationEmailOTP)
router.post('/user/resendemailOTP',resendRegisterationEmailOTP)
router.post('/login',UserLogin)
router.get('/delete/:id',DeleteController)
router.post('/greetingcards/categories',authLogin,Category)

module.exports = router;