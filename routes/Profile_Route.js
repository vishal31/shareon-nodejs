//Third party package
const express = require('express');
const {body}  = require('express-validator');
const multer = require('multer');



const diskStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/profile');
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}__${file.originalname}`)
    }
})


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
const Profile_Controller = require('../app/controllers/Profile_Controller');



router.get('/profile', T_V_M , I_U_E_M, Profile_Controller.Get_Profile_Controller);

//router.get('/profile-pic', T_V_M , I_U_E_M, Profile_Controller.Get_Profile_Controller);

router.put('/profile-pic', T_V_M , I_U_E_M, multer({storage: diskStorage}).single('profileImg'), Profile_Controller.Put_Profile_Pic_Controller);





module.exports = router;