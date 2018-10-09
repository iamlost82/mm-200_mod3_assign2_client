//Task 3, A:
let Point = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.increaseHeight = function() {
        this.z += 5;
    }
}
Point.about = function(){
    return "Point handles 3D points";
}
// ------------------------------- 
myPoint1 = new Point(23, 12, 10);
myPoint2 = new Point(45, 17, 22)
 
myPoint1.increaseHeight();     
 
console.log(myPoint1.z); 
console.log(myPoint2.z);





//Task 3, B:
function MyDate(){
    this.date = Date();
    this.htmlElement = document.getElementById('task03Btn');
}
function myOtherDate(){
    let otherDate = {};
    otherDate.date = Date();
    otherDate.htmlelm = document.getElementById('task03Btn');
    return otherDate;
}
myDate = new MyDate();
myOtherDate = myOtherDate();
console.log(myDate);
console.log(myOtherDate);
/*--------------------------------------------------------------------//
//  From the lab, I think we kind of agreed that we had to trick      //
//  it in order to make a constructor-function return a Date object.  //
//  But I still get the same return from theese two functions         //
//  MyDate() and myOtherDate().                                       //
//  A factory function can return any object as far as I understand   //
//--------------------------------------------------------------------*/






//Task 3, C:
let info = Point.about();
console.log(info);