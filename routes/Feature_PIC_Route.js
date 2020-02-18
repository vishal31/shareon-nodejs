//Third party package
const express = require('express');
const {body}  = require('express-validator');
const multer = require('multer');

const diskStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/feature/');
    },

    filename: (req, file, cb) => {

        cb(null, `${Date.now()}__${file.originalname}`);
    }

});



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
const Feature_PIC_Controller = require('../app/controllers/Feature_PIC_Controller');


router.get('/feature-pic', T_V_M , I_U_E_M, Feature_PIC_Controller.Get_Feature_PIC);

router.post('/feature-pic', 

    T_V_M , 
    I_U_E_M,
    multer({storage: diskStorage}).single('featureImg'), 
    Feature_PIC_Controller.Post_Feature_PIC

);





module.exports = router;