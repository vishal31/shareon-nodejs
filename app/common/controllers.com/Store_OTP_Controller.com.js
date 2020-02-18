// Models
const User_Model = require('../../models/User_Model');
const Otp_Model = require('../../models/Otp_Model');




const Store_OTP_Controller = (req, res, next) => {

      
    const Email = req.body.email;

    console.log('req.Otp', req.Otp)


    Otp_Model.findOne({where: {email: Email}}) 
        .then(OtpExistences => {

            const Otp = req.Otp;
            const ExpiryDT = req.ExpiryDT;
            const NormalDT = req.NormalDT;
 
            if(!OtpExistences) {
                return Otp_Model.create({
                    
                    OTP: Otp,
                    email: Email,
                    Expiry_Time: ExpiryDT,
                    createdAt: NormalDT,
                });


           }//End of OtpExistences


           const OtpID = OtpExistences.id;

           return Otp_Model.findByPk(OtpID)
            .then(UserOtp => {

                UserOtp.OTP = Otp;
                UserOtp.Expiry_Time = ExpiryDT;
                return UserOtp.save();
            })
            
       })
       .then(CreatedOtp => {      

            res.status(201).json({
                message: 'Otp sent'
            });

        })
        .catch(err => next(err) );


}



module.exports = Store_OTP_Controller;