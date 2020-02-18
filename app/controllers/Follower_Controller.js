
const sequelize = require('../common/utils.com/dbConnection.com');

//Model
const Follower_Model = require('../models/Follower_Model');




//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;



//Updating user profile
exports.Get_Follower = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

        if(req.body.followerID == req.userID) {
            return res.json({message: 'You cant follow your self'})
        }

    
    const followerID = req.params.id;
    const userID = req.userID;


    Follower_Model.findAll({where: {followerID: followerID, userId: userID}})
    .then(follower => {
        res.json({data: follower});
    })
    .catch(err => next(err));
        


}//End of method






//Inserting follower
exports.Post_Follower = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

        if(req.body.followerID == req.userID) {
            return res.json({message: 'You cant follow your self'})
        }

        const followerID = req.body.followerID;
        const userID = req.userID;

    
        Follower_Model.findAll({where: {followerID: followerID, userId: userID}})
        .then(follower => {

            
             
           if(follower.length == 0) {

                Follower_Model.create({
    
                     followerID : followerID,
                     userId     : userID
                })
                .then(_ => {
                    return res.json({data: 'following', followerID: followerID});
                })
                .catch(err => next(err));
            
            }else{
                return res.json({data: 'following'});
            }
        }) 
        .catch(err => next(err));
        


}//End of Post_Follower method






//Inserting follower
exports.Delete_Follower = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

    if(req.body.followerID == req.userID) {
        return res.json({message: 'You cant follow your self'})
    }

    const followerID = req.body.followerID;
    const userID = req.userID;
    
    Follower_Model.destroy({where: {followerID: followerID, userId: userID}})
        .then(follower => {

            if(follower)
                return res.json({data: 'follow'});

            
            if(!follower)
                return res.json({data: 'following'});

        }) 
        .catch(err => next(err));
        


}//End of Post_Follower method