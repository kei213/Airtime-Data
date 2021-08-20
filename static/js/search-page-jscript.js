console.log('search-page-jscript.js')

const main = document.querySelector(".main-container");

function init() {  
    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 50)        
}

init();

// Materialize Datepicker
 document.addEventListener('DOMContentLoaded', function() {
    var calendar = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(calendar, {
        format:'d-mmm-yyyy'})
    });

// Get Date from user 
  
let datePassed = ""; 

document.querySelector("#search-button").addEventListener("click", (e) => {
    e.preventDefault();
    const dateInput = document.querySelector("#date-input").value;
    console.log(dateInput)
    const dateSplit = dateInput.split('-');
    if (dateSplit[1] === "Jan") {
        dateSplit[1] = 0;
    }
    if (dateSplit[1] === "Feb") {
        dateSplit[1] = 1;
    }
    if (dateSplit[1] === "Mar") {
        dateSplit[1] = 2;
    }
    if (dateSplit[1] === "Apr") {
        dateSplit[1] = 3;
    }
    if (dateSplit[1] === "May") {
        dateSplit[1] = 4;
    }
    if (dateSplit[1] === "Jun") {
        dateSplit[1] = 5;
    }
    if (dateSplit[1] === "Jul") {
        dateSplit[1] = 6;
    }
    if (dateSplit[1] === "Aug") {
        dateSplit[1] = 7;
    }
    if (dateSplit[1] === "Sep") {
        dateSplit[1] = 8;
    }
    if (dateSplit[1] === "Oct") {
        dateSplit[1] = 9;
    }
    if (dateSplit[1] === "Nov") {
        dateSplit[1] = 10;
    }
    if (dateSplit[1] === "Dec") {
        dateSplit[1] = 11;
    }

    const datePassed = dateSplit
    console.log(datePassed);
    /*sessionStorage.setItem("date-passed", datePassed);
    window.location = "table16.html";**/
}) 

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1);
yesterday.toDateString();

const yestDate = yesterday.getDate();
const yestMonth = yesterday.getMonth();
const yestYear = yesterday.getFullYear();
let yestString = `${yestDate}-${yestMonth}-${yestYear}`;
console.log('yestString is', yestString)


document.querySelector("#yesterdayLink").addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.setItem("date-passed", yestString);
    window.location = "table16.html";
})


let tableIcon = document.querySelector('#searchIcon');
let winLocation = "search";

function changeStyle() {
    console.log(winLocation)
    if (winLocation ===  "search") {
        tableIcon.style.color = "#8f9499";
        
    }
}

changeStyle()


