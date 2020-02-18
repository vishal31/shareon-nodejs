//Third party package
const jwt = require('jsonwebtoken');

const Is_Auth_Middleware = (req, res, next) => {

    const inputToken = req.header('Authorization');
   
    if(!inputToken) {
        const error = new Error('Token is not available');
        error.statusCode = 422;
        throw error;

    }else if(inputToken) {

        const token = inputToken.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (error, result) => {

            if(error) {
                const error = new Error('Unauthorized');
                error.statusCode = 401;
                throw error;
            }

            console.log('result.userID', result.userID)
           
            req.userID    = result.userID;
            req.userEmail = result.userEmail;


            next();
           
        });//End of Jwt method

        

    }//End of else-if block
  
   
};//End of function


module.exports = Is_Auth_Middleware;