const Sequelize = require('sequelize');

const sequelize = require('../common/utils.com/dbConnection.com');


const Follower_Model = sequelize.define('follower', {

//attributes

    followerID: {
        type: Sequelize.INTEGER,
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




module.exports = Follower_Model