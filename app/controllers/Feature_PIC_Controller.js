
const sequelize = require('../common/utils.com/dbConnection.com');

//Model
const Feature_PIC_Model = require('../models/Feature_PIC_Model');
const Like_Model = require('../models/Like_Model');





//Creating Error Object
const error = new Error('User not found');
      error.statusCode = 400;





/************************************************* Controllers  *********************************************** */





//Inserting user profile
exports.Get_Feature_PIC = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 

        Feature_PIC_Model.findAll({
        
            // attributes: [['id', 'feature_pic_id'], 'featureImg', 'userId'],
            where: {userId: req.userID},
            order: [

                ['id', 'DESC']
            ],

            include: [Like_Model]
            
        })        
        .then((Feature_PIC) => {

            console.log(Feature_PIC.dataValues)

            res.json({data: Feature_PIC });
        })
        .catch(err => next(err));


}//End of method



//Inserting user profile
exports.Post_Feature_PIC = (req, res, next) => {

    //Checking User Existence
    if(!req.is_user_exist)
        throw error; 


    Feature_PIC_Model.create({
    
        featureImg : req.file.filename,
        userId     : req.userID
    
    })
    .then(_ => {
        res.json({message: 'Uploaded successfully'});
    })
    .catch(err => next(err));

}//End of method