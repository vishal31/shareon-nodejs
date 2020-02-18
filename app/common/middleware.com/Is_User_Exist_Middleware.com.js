//Third Party Package
const {validationResult} = require('express-validator');


//Models
const User_Model = require('../../models/User_Model');



const Is_User_Exist_Middlewre = (req, res, next) => {

    const validationError = validationResult(req);

    if(!validationError.isEmpty()) 
        return next(validationError.array());


        const Email = req.body.email || req.userEmail;

       


    User_Model.findOne({where: {email: Email}})
        .then(user => {

            if(!user) {
                req.is_user_exist = false;
                return next();
            }

            req.is_user_exist = true;
            return next();
                
        })
        .catch(err => next(err));
   
   
   
};//End of Is_User_Exist_Middlewre() method



module.exports = Is_User_Exist_Middlewre;