/**
 * GLOBAL VARIABLES
 */
const date  = new Date();
const currentYear  = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay   = date.getDate();

const currentHour  = date.getHours();
const currentMin   = date.getMinutes();
const currentSec   = date.getSeconds();

const AMorPM = date.toLocaleString().split(' ')[2];


//END OF GLOABAL VARIABLES



exports.DateGenerator = () => {

    const objDate = {currentYear, currentMonth, currentDay};
    const currentDate = `${currentYear}-${currentMonth + 1}-${currentDay}`;
   
    return [currentDate, objDate];
}


exports.ExpiryTimeGenerator = (MinParameter) => {

    if(!MinParameter) {
        MinParameter = 0;
    }else if(typeof MinParameter != 'number') {
        throw new Error('Minutes should be number');
    }

    const CurrentTimeStr = `${currentHour}:${currentMin}:${currentSec}:${AMorPM}`;

    if(MinParameter > 60) {
      
        let actualMin = MinParameter - 60; 
        let Hrs = 1; 
       
        if(actualMin >= 60) {
            Hrs = Math.round(MinParameter/60);

            actualMin = 00;
          
            const ExpiryTime = {Hours: currentHour + Hrs, Minutes: currentMin, Sec: currentSec, AMorPM};
            return [CurrentTimeStr, ExpiryTime];

        }else{

            const ExpiryTime = {Hours: currentHour + Hrs, Minutes: actualMin, Sec: currentSec, AMorPM}
            return [CurrentTimeStr, ExpiryTime];
        }

       
        //const actualHrs = HrsFun(currentHour + Hrs, Hrs, AMorPM)
        
    }else{
        const ExpiryTime = {Hours: currentHour, Minutes: currentMin + MinParameter, Sec: currentSec, AMorPM};

        return [CurrentTimeStr, ExpiryTime];
    }




};



