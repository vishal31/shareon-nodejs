//Utility from util folder
const DATGenerator = require('./DateAndExpiryTimeGenrator.com');


const OtpGenerator = (MinutesParam) => {

    if(!MinutesParam || typeof MinutesParam != 'number'){
        const error = new Error('Minutes is required. And it should be in number');
        error.statusCode = 500;
        throw error;
    }


    const uniqueNum =  Otp(); 
    const uniqueNumLength = uniqueNum.toString().length;

    if(uniqueNumLength < 6){
        Otp();
    }
    else{
     
        const ExpiryTimeGen = DATGenerator.ExpiryTimeGenerator(MinutesParam)[1];
        const ExpiryDateGen = DATGenerator.DateGenerator();
    
                 
        const Hrs    = ExpiryTimeGen.Hours;
        const Min    = ExpiryTimeGen.Minutes;
        const sec    = ExpiryTimeGen.Sec;
        const AmorPm = ExpiryTimeGen.AMorPM;
    
        //Expiry Date and Time
        const ExpiryTime = `${Hrs}:${Min}:${sec}:${AmorPm}`;
        const date = ExpiryDateGen[0];
        const ExpiryDateandTime = `${date} ${ExpiryTime}`
    
        //Normal date and Time 
        const currentTime = DATGenerator.ExpiryTimeGenerator(0)[0];
        const normalDT = `${date} ${currentTime}`; 
     
        return {Otp : uniqueNum, ExpiryDateandTime, normalDT};
    
    }  

};




//Generating Otp
const Otp = () => Math.round(Math.random() * 999999); //End of otp function







/*************************************************************************************************************************************** */







            

module.exports = OtpGenerator;