
const sequelize = require('../common/utils.com/dbConnection.com');

//Model
const User_Model = require('../models/User_Model');
const Like_Model = require('../models/Like_Model');







//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;


//Fetching user profile
exports.Get_Like_Controller = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

    const userID = req.userID;

    Like_Model.findAll({where: {userId: userID } })
        .then(like => {

            if(like.length > 0) {
                like[0].dataValues.like = 'Unlike'
            }
            
            res.json({data: like})
        })
        .catch(err => next(err))



};//End of Profile_Controller() method




//Fetching user like
exports.Post_Profile_Controller = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

    const userID = req.userID;
    const featurePicId = req.body.featurePicId;


    Like_Model.findAll({where: {featurePicId : featurePicId , userId: userID}})
        .then(featurePic => {
        
         
       if(featurePic.length == 0) {

            Like_Model.create({

                userId : userID,
                featurePicId: featurePicId 
            })
            .then(like => {

                res.json({message: 'Unlike', featurePicId: like.featurePicId});

            })
            .catch(err => next(err));


        
        }else{
            Like_Model.destroy({where:{ featurePicId : featurePicId , userId: userID }})
                .then(like => {
                    return res.json({message: 'Like', featurePicId: like.featurePicId});
                })
                .catch(e => next(e))
        }
    }) 
    .catch(err => next(err));
    



    
};//End of Profile_Controller() method
