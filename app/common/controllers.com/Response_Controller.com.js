
const Response_Controller = (req, res, next) => {

    //Checking User Existence
    if(req.is_user_exist) {
        const error = new Error('User already exist');
            error.statusCode = 409;
        throw error; 
    }else{
        res.json({message: 'Not Exist', status: true}); 
    }


    

};//End of method





module.exports = Response_Controller;