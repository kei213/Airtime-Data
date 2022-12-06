import { initFirebase } from './initFirebase.js'
import { snapshotEmpty } from './tools/snapshotEmpty.js'
import { roundOneDone } from './tools/roundOneDone.js'
import { roundTwoDone } from './tools/roundTwoDone.js'
import { refreshWindow } from './tools/refreshWindow.js'

// verify firebase api key
const apiKey = sessionStorage.getItem("apiKey")
if (apiKey == null) {
  window.location = "/login"
}

// Firebase configuration
let firebase = initFirebase(apiKey)
const db = firebase[0]
const auth = firebase[1]

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      const userInfo = document.querySelector('#userInfo')
      userInfo.innerText = user.email    

    } else {
      console.log('user logged out')
    }
})

// function to refresh window if it comes back into focus after 30mins
refreshWindow()

// page load transition
var main = document.querySelector(".main-container");
function init() {  
    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 200)        
}
init();

//UI classes
class UI {  
    static showDayText(displayDay) {
      const largeDayDisplay = document.querySelector('#large-day-display');        
        largeDayDisplay.innerHTML = displayDay;  
    }

    static showDayString(day, monthText, year) {
        const dateString = `${day} ${monthText} ${year}`;
        const dateDisplay = document.querySelector('#date-display');        
        dateDisplay.innerHTML = dateString;
    }

}

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

var dayString = `${day}-${month}-${year}`;

const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

const displayDay = weekday[date.getDay()];
UI.showDayText(displayDay)

const monthDay = new Array(12)
  monthDay[0] = "Jan";
  monthDay[1] = "Feb";
  monthDay[2] = "Mar";
  monthDay[3] = "Apr";
  monthDay[4] = "May";
  monthDay[5] = "Jun";
  monthDay[6] = "Jul";
  monthDay[7] = "Aug";
  monthDay[8] = "Sep";
  monthDay[9] = "Oct";
  monthDay[10] = "Nov";
  monthDay[11] = "Dec";
const monthText = monthDay[date.getMonth()];
UI.showDayString(day, monthText, year);

// Getting round status from firebase
let roundStatus 
db.collection("Round").where('dayString','==', `${dayString}`).get()    
    .then((snapshot) => {   
        if (snapshot.empty) {          
            snapshotEmpty()
        } 
        
        snapshot.docs.forEach(doc => {              
            const data = doc.data(); 
            roundStatus = data.roundStatus
        })  

        if (roundStatus === '1'){
            roundOneDone()            
        }

        if (roundStatus === '2'){
            roundTwoDone()
        }  
    });

//View records button
document.querySelector('#viewRecords').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = "/table"
})

//Phone numbers button
document.querySelector('#phoneNumbers').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = "/phone-numbers"
})

  
