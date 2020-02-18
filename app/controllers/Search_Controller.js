const sequelize = require('../common/utils.com/dbConnection.com')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

//Model
const User_Model = require('../models/User_Model');
const Follower_Model = require('../models/Follower_Model');






//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;





/************************************************* Controllers  *********************************************** */





//Inserting user profile
module.exports = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

        let user_name;
        if(!req.query.user_name){
            user_name = null;
        }else{
            user_name = req.query.user_name;
        }
            

    const SQL = `SELECT 
    
        users.id AS user_main_ID, user_name, profile_picture,
        followers.id AS follower_main_ID, followerID, userId
    
    FROM users
        LEFT JOIN followers ON followers.followerID = users.id
        WHERE user_name LIKE '${user_name}%'
        ORDER BY user_name
    `

        sequelize.query(SQL)
        .then(([search_result]) => {


            for(let user of search_result) {

                if(user.user_main_ID == req.userID) {
                    user.btnValue = '';
                    user.role = 'admin'

                    console.log('first')
                }


                if(user.userId == req.userID) {
                    user.btnValue = 'following';
                    user.role = 'user';

                    console.log('second')

                }else if(user.userId != req.userID && user.user_main_ID != req.userID){
                    user.btnValue = 'follow';
                    user.role = 'user';

                    console.log('third')

                }

                //if(user.user_name)

            };//End of for-of loop

            res.json({data: search_result });

        })
        .catch(err => next(err) );

}//End of method

