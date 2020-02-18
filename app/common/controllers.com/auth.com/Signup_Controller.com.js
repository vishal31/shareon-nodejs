//Third Party Packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
 

const sequelize = require('../../utils.com/dbConnection.com');


//Models
const User_Model = require('../../../models/User_Model');


const Signup_Controller = (req, res, next) => {

    const validationError = validationResult(req);

    if(!validationError.isEmpty()) 
        return next(validationError.array());
 
        
    //Checking User Existence
    if(req.is_user_exist) {
        const error = new Error('User already exist');
            error.statusCode = 409;
        throw error; 
    }

    const Password = req.body.password;

    bcrypt.hash(Password, 12)
        .then(hashPassword => {

            return User_Model.create({

                user_name          : req.body.user_name,
                email              : req.body.email,
    
                password           : hashPassword,
                profile_picture     : req.body.profile_picture,
                Verified           : 0,

            });

        })
        .then(user => {
            res.status(201).json({
                message : 'Signup successfull', 
                userID  : user.id, 
            });
        })
        .catch(err => next(err));
    
        
};



module.exports = Signup_Controller;