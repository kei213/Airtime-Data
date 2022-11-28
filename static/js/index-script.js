// Firebase configuration
import { initFirebase } from './initFirebase.js'

const apiKey = sessionStorage.getItem("apiKey")

//make auth and firestore references
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});


var main = document.querySelector(".main-container");

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
      const userInfo = document.querySelector('#userInfo')
      userInfo.innerText = user.email    

  } else {
    console.log('user logged out')
  }
  })

// logout user
/*const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out')
  })
})*/

// page load transition
function init() {  
    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 200)        
}

init();

//Navbar dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    var elemsNav = document.querySelectorAll('.dropdown-trigger')[0];
    var instancesNav = M.Dropdown.init(elemsNav, {});
  });

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

// Getting data from firebase
db.collection("Round")
        .where('dayString','==', `${dayString}`).get()
        .then(function(querySnapshot) {
            const displayMessage = document.querySelector('#display-message');

            if (querySnapshot.empty) {               
                displayMessage.innerHTML = "please submit today's Round 1 amounts. Thanx..";
                const addButton = document.querySelector("#addDataBtnText");
                addButton.innerText = "Add Round 1 Data";
                const sectionText = document.querySelector("#sectionTextTop");
                /*sectionText.innerText = "Round 1";*/

                const roundOneCancelIcon = document.querySelector("#roundOneCancelIcon");
                      roundOneCancelIcon.style.display = 'block';
                const roundOneText = document.querySelector("#roundOneText");
                      roundOneText.innerText = 'Not Done';   
                const roundTwoCancelIcon = document.querySelector("#roundTwoCancelIcon");                                                           
                      roundTwoCancelIcon.style.display = 'block';        
                const roundTwoText = document.querySelector("#roundTwoText");
                      roundTwoText.innerText = 'Not Done';  

                document.querySelector('#addDataBtn').addEventListener('click', (e) => {
                    e.preventDefault() 
                    const roundToBeDone = 1
                    sessionStorage.setItem("roundToBeDone", roundToBeDone)
                    window.location = 'airtime-center-form'
                })
            }
            
            else {
                db.collection("Round")
                         .where('dayString','==', `${dayString}`).get().then((snapshot) => {
                              snapshot.docs.forEach(doc => {
                              const round = doc.data();

                              if (round.roundStatus === '1'){
                                  displayMessage.innerHTML = " Round 1 has been done, Round 2 left";

                                  const addButton = document.querySelector("#addDataBtnText");
                                  addButton.innerText = "Add Round 2 Data";
                                  const sectionText = document.querySelector("#sectionTextTop");
                                                    /*sectionText.innerText = "Round 2";*/
                                                     
                                  const roundOneDoneIcon = document.querySelector("#roundOneDoneIcon");
                                  roundOneDoneIcon.style.display = 'block';
                                  const roundOneText = document.querySelector("#roundOneText");
                                  roundOneText.innerText = 'Done';   
                                  const roundTwoCancelIcon = document.querySelector("#roundTwoCancelIcon");                                                           
                                  roundTwoCancelIcon.style.display = 'block';        
                                  const roundTwoText = document.querySelector("#roundTwoText");
                                  roundTwoText.innerText = 'Not Done';                                                       

                                  document.querySelector('#addDataBtn').addEventListener('click', (e) => {
                                      e.preventDefault()
                                      const roundToBeDone = 2
                                      sessionStorage.setItem("roundToBeDone", roundToBeDone) ;
                                      window.location = 'airtime-center-form'                                                     
                                  })
                              }

                                        if (round.roundStatus === '2'){
                                              displayMessage.innerHTML = " All rounds done, excellent."                                               
                                                                            
                                                     
                                              const sectionText = document.querySelector("#sectionTextTop");
                                                    /*sectionText.innerText = "- Today all done";*/

                                              const roundOneDoneIcon = document.querySelector("#roundOneDoneIcon");
                                                    roundOneDoneIcon.style.display = 'block';
                                              const roundOneText = document.querySelector("#roundOneText");
                                                    roundOneText.innerText = 'Done';   
                                              const roundTwoDoneIcon = document.querySelector("#roundTwoDoneIcon");                                                           
                                                    roundTwoDoneIcon.style.display = 'block';        
                                              const roundTwoText = document.querySelector("#roundTwoText");
                                                    roundTwoText.innerText = 'Done';   

                                              document.querySelector('#addDataBtn').addEventListener('click', (e) => {
                                                    e.preventDefault()

                                                    //Modal                                                        
                                                    var elemsAddData = document.querySelectorAll('#modal1');
                                                    var instancesAddData = M.Modal.init(elemsAddData);
                                                    console.log('modal1')                                                    
                                                      
                                              })
                                        }
                                                 
                      });                                      
                
            });
       
        };
});

// Search modal init
var closeModal = document.querySelector('#modalClose')

document.addEventListener('DOMContentLoaded', function() {

    var elemsSearch = document.querySelector('#modal2');
    var instancesSearch = M.Modal.init(elemsSearch);    
    
    // close search modal
    closeModal.addEventListener('click', (e) => {
      e.preventDefault()
      instancesSearch.close()

    })
});

//View records button
document.querySelector('#viewRecords').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = "table"
})

//Phone numbers button
document.querySelector('#phoneNumbers').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = "phone-numbers"
})


//Search component ------------------------------------------------------------------

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
    sessionStorage.setItem("date-passed", datePassed);
    window.location = "table";
}) 

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1);
yesterday.toDateString();

const yestDate = yesterday.getDate();
const yestMonth = yesterday.getMonth();
const yestYear = yesterday.getFullYear();
let yestString = `${yestDate}-${yestMonth}-${yestYear}`;

document.querySelector("#yesterdayLink").addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.setItem("date-passed", yestString);
    window.location = "table";
})

document.querySelector("#calendarIcon").addEventListener("click", (e) => {
  e.preventDefault()
  document.querySelector("#date-input").click()
  console.log('calendar clicked')
})

//datepicker init
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      format:'d-mmm-yyyy',

    });
  });