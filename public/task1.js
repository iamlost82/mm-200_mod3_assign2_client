let responseDiv = document.getElementById('responseDiv');
let leapYearInput = document.getElementById('leapYearInput');
let leapYearCheckBtn = document.getElementById('leapYearCheckBtn');

//Handle buttonclick
leapYearCheckBtn.addEventListener('click', function(){
    let inputYear = leapYearInput.value;
    let response = {success:true};
    //Validate input
    if(inputYear === ""){
        response = {success:false,msg:`<p>Error:Input can't be blank!</p>`}
    }
    //if input is ok, continue leapyeartest
    if(response.success===true){
        if(checkLeapYear(inputYear) === true){
            response.msg = `<p>The year ${inputYear} is a leap year!</p>`;
        } else{
            response.msg = `<p>The year ${inputYear} is NOT a leap year</p>`;
        }
        
    }
    responseDiv.innerHTML = response.msg;
});
function checkLeapYear(year){
    let isLeapYear = true;
    if(year%4!==0){
        isLeapYear = false;
    } else if(year%100!==0){
        isLeapYear = true;
    } else if(year%400!==0){
        isLeapYear = false;
    } else{
        isLeapYear = true;
    }
    return isLeapYear;
}
