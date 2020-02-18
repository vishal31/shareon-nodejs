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
const Follower_Controller = require('../app/controllers/Follower_Controller');


router.get('/follow/:id', 

    T_V_M , 
    I_U_E_M,
    Follower_Controller.Get_Follower

);


router.post('/follow', 

    T_V_M , 
    I_U_E_M,
    Follower_Controller.Post_Follower

);


router.delete('/follow', 

    T_V_M , 
    I_U_E_M,
    Follower_Controller.Delete_Follower

);




module.exports = router;