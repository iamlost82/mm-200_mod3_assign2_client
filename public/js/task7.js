let myFirstListDiv = document.getElementById('myFirstListDiv');
let mySecondListDiv = document.getElementById('mySecondListDiv');
let myThirdListDiv = document.getElementById('myThirdListDiv');
let arrLengthDiv = document.getElementById('arrLengthDiv');

myListItems = ["Bread","Sugar","Coffee","Milk"];

let myFirstList = superlist(myListItems);
let mySecondList = superlist(myListItems);
let myThirdList = superlist(myListItems);

mySecondList.setTheme('forest');
myThirdList.setTheme('candy');

myFirstListDiv.appendChild(myFirstList);
mySecondListDiv.appendChild(mySecondList);
myThirdListDiv.appendChild(myThirdList);

arrLengthDiv.innerHTML = `The number of items is: ${myFirstList.getLength()}`;