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
 
console.log(myPoint1.z); console.log(myPoint2.z);

//Task 3, B:
function MyDate(){
    this.dato = new Date();
}

myDate = new MyDate();
console.log(myDate);

//Task 3, C:
let info = Point.about();
console.log(info);