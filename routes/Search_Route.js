//Third party package
const express = require('express');
const {body}  = require('express-validator');



const router = express.Router();

//Middleware

const T_V_M = require('../app/common/middleware.com/Token_Verify_Middleware.com');
const I_U_E_M = require('../app/common/middleware.com/Is_User_Exist_Middleware.com');

/**
 *  T_V_M stand for Token Verify Middleware
 * 
 * I_U_E_M stand for Is_User_Exist_Middleware
 * 
 */

//Controller
const Search_Controller = require('../app/controllers/Search_Controller');



router.get('/search', T_V_M , I_U_E_M, Search_Controller);




module.exports = router;