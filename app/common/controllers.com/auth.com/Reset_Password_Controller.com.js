//third party package
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');



//Models
const User_Model = require('../../../models/User_Model');


const Reset_Password_Controller = (req, res, next) => {


    const validationError = validationResult(req);

    if(!validationError.isEmpty()) 
        return next(validationError.array());
    
  
    //Checking User Existence
    if(!req.is_user_exist) {
        const error = new Error('User not found');
            error.statusCode = 400;
        throw error; 
    }
    
    const Email = req.body.email;
    const Password = req.body.password;


    bcrypt.hash(Password, 12)
        .then(hashPassword => {

            User_Model.findOne({where:{ email: Email} })
                .then(user => {

                 user.password = hashPassword;
                    return user.save();
                })
                .then(updatedUser => {

                    res.status(201).json({
                        message: "Password reseted"
                    });
                })
                .catch(err => next(err));

        })
        .catch(err => next(err));


}


module.exports = Reset_Password_Controller;