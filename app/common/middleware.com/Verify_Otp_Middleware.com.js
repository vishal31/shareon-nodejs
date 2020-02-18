//third party package
const {validationResult} = require('express-validator');



//utils.com
const DTGenerator = require('../utils.com/DateAndExpiryTimeGenrator.com');


//Models
const Otp_Model = require('../../models/Otp_Model');


const Verify_Otp_Middleware = (req, res, next) => {

    const validationError = validationResult(req);

    if(!validationError.isEmpty()) 
        return next(validationError.array());

    //Checking User Existence
    // if(!req.is_user_exist) {
    //     const error = new Error('User not found');
    //         error.statusCode = 400;
    //     throw error; 
    // }
    

    const Email = req.body.email;
    const UserOtp = req.body.OTP;

    /**
     * Creating Otp Error
     */
    const error = new Error('Invalid Otp');
          error.statusCode = 422

    Otp_Model.findOne({where: {email: Email}})
        .then(User => {

            if(!User) {
                throw error;
            }

            const Otp = User.OTP;
            const createdAt = User.createdAt
            const ExpiryTime = User.Expiry_Time;

            const currentDate = DTGenerator.DateGenerator()[0];
            const currentTime = DTGenerator.ExpiryTimeGenerator()[0];
            const currentDT = `${currentDate} ${currentTime}`;

         
            //Throwing Error
            if(currentDT > ExpiryTime || UserOtp != Otp) {
                //console.log('ee', currentDT)

                throw error;
            }

            next();

        })
        .catch(err => next(err) );



};//End of method





module.exports = Verify_Otp_Middleware;