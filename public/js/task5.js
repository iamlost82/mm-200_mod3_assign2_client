let yearInput = document.getElementById('yearInput');
let monthSelect = document.getElementById('monthSelect');
let generateCalenderBtn = document.getElementById('generateCalenderBtn');
let calenderDiv = document.getElementById('calenderDiv');

let months = [
    {name:'January',days:31},
    {name:'February',days:28},
    {name:'March',days:31},
    {name:'April',days:30},
    {name:'May',days:31},
    {name:'June',days:30},
    {name:'July',days:31},
    {name:'August',days:31},
    {name:'September',days:30},
    {name:'October',days:31},
    {name:'November',days:30},
    {name:'December',days:31}
];
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function populateMonthSelect(){
    for(i in months){
        let options = document.createElement('option');
        options.value = i;
        options.innerHTML = months[i].name;
        monthSelect.appendChild(options);
    }
}

function populateYearInput(){
    let today = new Date();
    yearInput.value = today.getFullYear();
}

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
    console.log(isLeapYear);
    return isLeapYear;
}

function evaluateAndCorrectInput(){
    if(yearInput.value < 0){
        yearInput.value = 0;
    }
    if(yearInput.value===''){
        populateYearInput();
    }
}

function renderMonth(){
    
    let year = yearInput.value;
    let month = parseInt(monthSelect.value);
    let daysInMonth = months[month].days;
    if(month===1){
        if(checkLeapYear(year)===true){
            daysInMonth++;
        }
    }
    let output = `<h2>${months[month].name} - ${year}</h2>`;
    output += `<ul>`;
    for(let i = 1;i <= daysInMonth;i++){
        let listDate = new Date(year,month,i);
        let dayOfWeek = listDate.getDay();
        let myClass = 'weekday';
        if(dayOfWeek===0){
            myClass = 'sunday';
        }
        output += `<li class="day">${i}</li>`;
        output += `<li class="${myClass}">${days[dayOfWeek]}</li>`;
    }
    output += `</ul>`;
    calenderDiv.innerHTML = output;
}

generateCalenderBtn.addEventListener('click',function(){
    evaluateAndCorrectInput();
    renderMonth();
});

populateMonthSelect();
populateYearInput();