//This project is now being hosted on git.kenmarkserver.com

/**
 * 
 */

/********************************************** Third Party Packages ************************************************ */

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


/********************************************** End of Third Party Packages ************************************************ */





/************************************* Requiring Some special files or function *************************************** */

const sequelize = require('./app/common/utils.com/dbConnection.com');


/************************************* End of Requiring Some special files or function ********************************* */





/********************************************** Requiring All Routes ************************************************ */

const Auth_Route = require('./routes/Auth_Route');
const Feature_PIC_Route = require('./routes/Feature_PIC_Route');
const Follower_Route = require('./routes/Follower_Route');
const Profile_Route = require('./routes/Profile_Route');
const Search_Route = require('./routes/Search_Route');
const Like_Route = require('./routes/Like_Route');
const Home_Route = require('./routes/Home_Route');










/********************************************** End of Requiring All Routes ************************************************ */









/**
 * Initalizing express
 */

const app = express();


/***************************** Configuring All third padrty packages Using express middleware **************************** */

app.use(bodyParser.urlencoded( {extended: true} ));//for url encoded data
app.use(bodyParser.json()); //for json data

app.use(express.static('public/feature/'));
app.use(express.static('public/profile/'));




/***************************** End of Configuring All third padrty packages ************************* */




/**
 * Setting headers for CORS error before initsalizing Routes
 * 
 * setHeader is not going to send response immediately.
 * This will set only respone header
 */
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();

});




/********************************************** Initalizing All Routes ************************************************ */

app.use(Auth_Route);
app.use(Feature_PIC_Route);
app.use(Follower_Route);
app.use(Profile_Route);
app.use(Search_Route);
app.use(Like_Route);
app.use(Home_Route);






/********************************************** End of Initalizing All Routes ************************************************ */











/************************************* Express middleware or Special function to handle errors ************************** */

app.use((req, res, next) => {
    res.status(405).json({error: `${req.method} Method is not supported`});
 });



 app.use((error, req, res, next) => {

    const statusCode = error.statusCode || 500 ;
    const errorMessage = error.message || error;
    
    if(statusCode === 500) {
        console.log('app.js', error);
    }else{

        console.log('app.js user error', error);

    }

    
    res.status(statusCode).json({
        message : errorMessage
    });

 });//End of error handling middleware              





/************************************ End Express middleware or Special function to handle errors ************************ */








/***********************************    Database Stuff   ******************************************************** */

/***
 * Requiring Models
 */

const User_Model        = require('./app/models/User_Model');
const Feature_PIC_Model = require('./app/models/Feature_PIC_Model');
const Follower_Model    = require('./app/models/Follower_Model');
const Like_Model        = require('./app/models/Like_Model');







/**
 * Defing Relations between Tables
 */


User_Model.hasMany(Feature_PIC_Model);
User_Model.hasMany(Like_Model);
Feature_PIC_Model.hasMany(Like_Model);
User_Model.hasMany(Follower_Model);





//Syncing models with database

sequelize.sync()

//sequelize.sync({force: true});

/***********************************  End Of Database Stuff   ******************************************************** */



app.listen(process.env.PORT || 8080);





/**
 * For testing 
 * 
 */













