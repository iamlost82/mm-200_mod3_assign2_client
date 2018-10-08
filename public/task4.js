//Task 4, A:
//Constructor

//Task 4, B:
//No, we only need to know the documentation on the function

//Task 4, C:
let testDate = new Date(1931,9,20);
let weekDay = testDate.getDay();
if(weekDay === 0){
    console.log("Sunday!!!")
} else{
    console.log("Not Sunday!!!");
}

//Task 4, D:
let testDate2 = Date.now();
console.log(testDate2);