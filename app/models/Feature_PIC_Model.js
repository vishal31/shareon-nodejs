const Sequelize = require('sequelize');

const sequelize = require('../common/utils.com/dbConnection.com');


const Feature_Pic_Model = sequelize.define('feature_pic', {

//attributes

    featureImg : {
        type: Sequelize.STRING,
    },

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




module.exports = Feature_Pic_Model