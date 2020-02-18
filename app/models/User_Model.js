const Sequelize = require('sequelize');

const sequelize = require('../common/utils.com/dbConnection.com');


const User_Model = sequelize.define('user', {
//attributes

    
    user_name: {
        type: Sequelize.STRING(30),
    },

   
    email: {
        type: Sequelize.STRING,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

   
    profile_picture: {
        type: Sequelize.STRING,
    },


    Verified: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: Sequelize.literal(0)
    },

});




module.exports = User_Model