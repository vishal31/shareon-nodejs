const Sequelize = require('sequelize');

const sequelize = require('../common/utils.com/dbConnection.com');



const OtpModel = sequelize.define('otp', {

    OTP : {
        type: Sequelize.INTEGER(4),
        allowNull: false
    },

    email : Sequelize.STRING,

    Expiry_Time: Sequelize.STRING(25), 

    createdAt: Sequelize.STRING(25),
    //updatedAt: Sequelize.STRING(25),
});


module.exports = OtpModel;