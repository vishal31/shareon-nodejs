
const sequelize = require('../common/utils.com/dbConnection.com');

//Model
const User_Model = require('../models/User_Model');
const Feature_PIC_Model = require('../models/Feature_PIC_Model');
const Follower_Model = require('../models/Follower_Model');





//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;


//Fetching user profile
exports.Get_Profile_Controller = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

    const userID = req.userID;

    const Profile_Pic_SQL = `SELECT profile_picture FROM users WHERE users.id = ${userID} `;


    const Post_SQL = `SELECT COUNT(feature_pics.userID) AS Post FROM users
                 LEFT JOIN feature_pics ON feature_pics.userId = users.id
            
            WHERE feature_pics.userId = ${userID}
     `;


     const Following_SQL = `SELECT COUNT(followers.userID) AS following FROM users
                 LEFT JOIN followers ON followers.userId = users.id
            
            WHERE followers.userId = ${userID}
     `;

     const Follower_SQL = `SELECT COUNT(followers.followerID) AS follower FROM users
                            LEFT JOIN followers ON followers.userId = users.id

        WHERE followers.followerID = ${userID}
    `;


     const profile = {};

     //Running Sql for Post
     sequelize.query(Profile_Pic_SQL)
     .then(([Profile_Pic]) => {

        profile.profile_Pic = Profile_Pic[0].profile_picture;
        
        return sequelize.query(Post_SQL);      

     })
     .then(([Post]) => {

            profile.post = Post[0].Post;

            return sequelize.query(Following_SQL);      

        })
        .then(([Following]) => {

            profile.following = Following[0].following;

            return sequelize.query(Follower_SQL);

        })
        .then(([Follower])=> {

            profile.follower = Follower[0].follower;
                    
            res.json({data: profile});

        })
        .catch(err => next(err));
    


};//End of Profile_Controller() method




//Updating user profile
exports.Put_Profile_Pic_Controller = (req, res, next) => {

    User_Model.findByPk(req.userID)
        .then(user => {
    
            user.profile_picture = req.file.filename;

            return user.save();
        })
        .then(_ => {
            res.json({message: 'Profile uploaded successfully'});
        })
        .catch(err => next(err))

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 


    const userID = req.userID;

    
        


}//End of method