const Sequelize = require('sequelize');

const sequelize = require('../common/utils.com/dbConnection.com');


const Like_Model = sequelize.define('like', {

//attributes
   
    createdAt : {
       type: 'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: false
    },

    updatedAt : {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }


});




module.exports = Like_Model