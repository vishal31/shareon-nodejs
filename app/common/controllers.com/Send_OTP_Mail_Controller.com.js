//Third Party Library 
const nodemailer = require('nodemailer');
const {validationResult} = require('express-validator');





//utils.com
const OtpGenerator = require('../utils.com/OtpGenerator.com');


const Send_OTP_Mail_Controller = (req, res, next) => {

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
    
    
    const MyOtpGenerator = OtpGenerator(5);
    let Otp      = MyOtpGenerator.Otp.toString();

    if(!Otp) {
        Otp = MyOtpGenerator.Otp.toString();
    }

    const msg = `You Otp: ${Otp}`;


    const transporter = nodemailer.createTransport({

        host: process.env.MAIL_HOST, 

        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }

    });


    const mailOptions = {

        from: process.env.MAIL_USERNAME,
        to: Email,
        subject: 'Otp',
        text : msg
    }

    transporter.sendMail(mailOptions, (err, info) => {

        if(err)
            return next(err);


        if(info) {
            console.log(info);
            
            req.Otp = Otp;
            req.ExpiryDT = MyOtpGenerator.ExpiryDateandTime;
            req.NormalDT = MyOtpGenerator.normalDT;
            next();
        }


    })
  



};


module.exports = Send_OTP_Mail_Controller;