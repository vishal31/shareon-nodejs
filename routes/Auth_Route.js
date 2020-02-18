///Third Party Library
const express = require('express');
const {body}  = require('express-validator');







const router = express.Router();

/***********************************  Middleware   ************************************** */
Is_User_Exist = require('../app/common/middleware.com/Is_User_Exist_Middleware.com')


/***********************************  Controllers   ************************************** */

const Signup_Controller = require('../app/common/controllers.com/auth.com/Signup_Controller.com');
const Login_Controller = require('../app/common/controllers.com/auth.com/Login_Controller.com');

const Send_OTP_Mail_Controller = require('../app/common/controllers.com/Send_OTP_Mail_Controller.com');
const Store_OTP_Controller = require('../app/common/controllers.com/Store_OTP_Controller.com');

const Verify_Otp_Middleware = require('../app/common/middleware.com/Verify_Otp_Middleware.com');
const Reset_Password_Controller = require('../app/common/controllers.com/auth.com/Reset_Password_Controller.com');

const Response_Controller = require('../app/common/controllers.com/Response_Controller.com')




/***********************************  Defining Routes   ************************************** */
 
//Signup Route
router.post('/signup',
[
    body('OTP').not().isEmpty().withMessage('OTP is required'),

    body('user_name').not().isEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Provide valid Email address'),
    body('password').not().isEmpty().withMessage('Password is required'),
], 
Is_User_Exist, 
Verify_Otp_Middleware,
Signup_Controller);



//Login Route
router.post('/login', 
[
    body('email').isEmail().withMessage('Provide valid Email address'),
    body('password').not().isEmpty().withMessage('Password is required'),

],  Is_User_Exist, Login_Controller);



//sendOtp Route
router.post('/sendOTP', 
[
    body('email').isEmail().withMessage('Provide valid Email address'),
],  Send_OTP_Mail_Controller, Store_OTP_Controller);



//verifyOtp Route
// router.post('/verifyOtp', 
// [
//     body('Otp').notEmpty().withMessage('Otp is required'),
//     body('Email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid Email is required')

// ], Is_User_Exist, Verify_Otp_Middleware, Response_Controller);


//resetPassword Route
router.put('/resetPassword', 
[
    body('OTP').notEmpty().withMessage('Otp is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid Email is required'),
    body('password').notEmpty().withMessage('New Password is required'),

],  Is_User_Exist, Verify_Otp_Middleware, Reset_Password_Controller);


router.post('/isUserExist', Is_User_Exist, Response_Controller);







module.exports = router;