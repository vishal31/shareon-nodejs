//Third Party Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');




//Models
const User_Model = require('../../../models/User_Model');


const Login_Controller = (req, res, next) => {

    const validationError = validationResult(req);

    if(!validationError.isEmpty()) 
        return next(validationError.array());
    
   //Checking User Existence
   if(!req.is_user_exist) {
        const error = new Error('User not found');
            error.statusCode = 400;
        throw error; 
    }

    const Password = req.body.password;
    const Email =  req.body.email;


    User_Model.findOne({where: {email: Email}})
        .then(user => {

            if(!user){
                const error = new Error('User not found');
                    error.statusCode = 409;
                throw error; 
            }

            bcrypt.compare(Password, user.password)
                .then(doMatch => {

                    if(!doMatch) {
                        const error = new Error('Unauthorized');
                            error.statusCode = 401;
                        throw error;
                    }   
        
                    const token = jwt.sign({userID: user.id, userEmail: user.email}, process.env.JWT_SECRET);

                    res.json({
                        userID: user.id,
                        token
                    });    
    
            })
            .catch(err => next(err));
    
        })
        .catch(err => next(err));
    
        
};



module.exports = Login_Controller;