
const sequelize = require('../common/utils.com/dbConnection.com');

//Model
const Follower_Model    = require('../models/Follower_Model');
const Feature_PIC_Model = require('../models/Feature_PIC_Model');
const Like_Model        = require('../models/Like_Model');






//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;



//Updating user profile
exports.Get_Home_Controller = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

        if(req.body.followerID == req.userID) {
            return res.json({message: 'You cant follow your self'})
        }

    const userID = req.userID;


    // const MYSQL = `SELECT followers.id AS FollowerID, followerID, followers.userId AS follower_userId,
    //                 feature_pics.id AS feature_picsId, featureImg, feature_pics.userId AS feature_pics_userId,
    //                 likes.id AS likesId, likes.userId AS likes_userId, likes.featurePicId AS likes_featurePicId

    //                 FROM followers
    
    //     
    //     JOIN feature_pics ON feature_pics.userId = followers.userId
    //     LEFT JOIN likes ON likes.featurePicId  = feature_pics.id

    //     WHERE followers.followerID = ${userID}
    // `;


    const MYSQL = `SELECT user_name, followers.id AS FollowerID, followerID, followers.userId AS follower_userId,
                    feature_pics.id AS feature_picsId, featureImg, feature_pics.userId AS feature_pics_userId,
                    feature_pics.createdAt AS date

                    FROM followers
    
        JOIN users ON users.id = followers.userId
        JOIN feature_pics ON feature_pics.userId = followers.userId

        WHERE followers.followerID = ${userID}

        ORDER BY feature_pics.id
    `;


    const home = {};

    sequelize.query(MYSQL)
        .then(([follower]) => {

            //console.log(follower)

            const likeArray = [];

            let counter = 0;
            for(let user of follower) {

               // console.log(user.feature_picsId)
               sequelize.query(`SELECT * FROM likes WHERE featurePicId = ${user.feature_picsId}`)
                .then(([likes]) => {

                    console.log('like.length', likes.length)

                    for(let like of likes) {
                        
                        if(like.userId === userID) {
                            user.likeOrUnlike = 'Unlike'; 

                        }else{
                            user.likeOrUnlike = 'Like'; 
                        }       

                    }//End of for-of loop

                    if(likes.length === 0) {
                        user.likeOrUnlike = 'Like'; 
                    }                    
                        user.likeCounter = likes.length;

                        //  likeArray.push(likes);

                        counter++;
                        if(follower.length == counter) {

                            res.json({data: follower});

                        }

                        //console.log('counter', counter)
                })
                .catch(err => next(err));
            }

            // if(likeArray.length > 0)
            //     res.json({data: likeArray});

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