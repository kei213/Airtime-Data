console.log('table.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyA0NeM50YRKXqIdd5RK71M_wx_EqgsgfMM",
    authDomain: "airtime-data-57cd2.firebaseapp.com",
    projectId: "airtime-data-57cd2",
    storageBucket: "airtime-data-57cd2.appspot.com",
    messagingSenderId: "542127943927",
    appId: "1:542127943927:web:5e6d713f2f221ca6dee3f2",
    measurementId: "G-C4380R8QLQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

//


const loader = document.querySelector(".loader");
const main = document.querySelector(".main-table");

function initOne() {  
    loader.style.display = "show";
    setTimeout(() => (loader.style.opacity = 1), 50)        
}

initOne();

function initTwo() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 50)
    
  }, 1800)
}

initTwo(); 

// UI Classes 

class UI {

  static showDate(dateSearched) {

    console.log('length', dateSearched.length)

    if (dateSearched.length === 8) {
        dateSearched = "0"+dateSearched
              
    }    
    
    let dateSplit = dateSearched.split('-');    
    console.log('dateSplit is', dateSplit)
    const monthShown = dateSplit[1]
    console.log('monthShown is', monthShown)   

    if (dateSplit[1] === "0") {
        dateSplit[1] = "January";
    }
    if (dateSplit[1] === "1") {
        dateSplit[1] = "February";
    }
    if (dateSplit[1] === "2") {
        dateSplit[1] = "March";
    }
    if (dateSplit[1] === "3") {
        dateSplit[1] = "April";
    }
    if (dateSplit[1] === "4") {
        dateSplit[1] = "May";
    }
    if (dateSplit[1] === "5") {
        dateSplit[1] = 'Jun';
    }
    if (dateSplit[1] === "6") {
        dateSplit[1] = 'Jul';
    }
    if (dateSplit[1] === "7") {
        dateSplit[1] = 'Aug';
    }
    if (dateSplit[1] === "8") {
        dateSplit[1] = 'Sep';
    }
    if (dateSplit[1] === "9") {
        dateSplit[1] = 'Oct';
    }
    if (dateSplit[1] === "10") {
        dateSplit[1] = 'Nov';
    }
    if (dateSplit[1] === "11") {
        dateSplit[1] = 'Dec';
    }
    console.log('dateSplit updated is', dateSplit)
    console.log(typeof dateSplit)
    const dateTobeShown = `${dateSplit[0]} ${dateSplit[1]} ${dateSplit[2]}`
    const dateDisplay = document.getElementById("date-display")
            dateDisplay.innerHTML = dateTobeShown;
  }   
}

//init modal
document.addEventListener('DOMContentLoaded', function() {
    var elemsSearch = document.querySelector('#modal2');
    var instancesSearch = M.Modal.init(elemsSearch);
    console.log('in modal')
});

// Get date
const date = new Date(); 

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let dayString = `${day}-${month}-${year}`;
  
let dateSearched = sessionStorage.getItem("date-passed");

    console.log('date passed is', dateSearched)
    
    
if (dateSearched === null) {
    dateSearched = dayString;
    
   } else {
           dateSearched = dateSearched.replace(',',"-")
           dateSearched = dateSearched.replace(',',"-")
           console.log('date searched-hyphen is', dateSearched)
   };


UI.showDate(dateSearched); 

// Get data from Firebase
function getAndDisplayData() {    
    db.collection("Airtime Center")
        .where('dayString','==', `${dateSearched}`).get()
        .then(function(querySnapshot) {
            
            if (querySnapshot.empty) {
                console.log('snapshot empty');
                const errorMessageSection = document.querySelector("#errorMessageSection")
                const errorMessage = document.createElement('span');
                      errorMessage.innerHTML = "No records exist for this day"
                      errorMessageSection.appendChild(errorMessage);

                const tableList = document.querySelector("#tablelistAc");
                const row = document.createElement('tr');        
                                row.innerHTML = `
                                    <td id = "table-column-heading">No Records</td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>`;
                                     
                                    tableList.appendChild(row); 
                

                const tableListTwo = document.querySelector("#tablelistWlc");
                                const rowTwo = document.createElement('tr');        
                                rowTwo.innerHTML = `
                                    <td id = "table-column-heading">No Records</td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td> - </td>`;
                                    
                                     
                                    tableListTwo.appendChild(rowTwo);  

            }
            
                 else { console.log('snapshot not empty')
                        var roundValueAc = 0;

                        db.collection('Airtime Center').where('dayString','==', `${dateSearched}`).orderBy("timestamp").get()
                            .then((snapshot) => {    
                            snapshot.docs.forEach(doc => {
                                
                                roundValueAc++;
                            	const returnedData = doc.data();                      

                               	let tableList = document.querySelector("#tablelistAc");
                        		const row = document.createElement('tr');        
                                row.innerHTML = `
                                    <td id = "table-column-heading">Round ${roundValueAc}</td>
                                    <td>${returnedData.mascomNzamelaAc}</td>
                                    <td>${returnedData.orangeNzamelaAc}</td>
                                    <td>${returnedData.btcNzamelaAc}</td>
                                    <td>${returnedData.myzakaAc}</td>
                                    <td>${returnedData.zimmer1Ac}</td>
                                    <td>${returnedData.smegaAc}</td>
                                    <td>${returnedData.mtsMascomAc}</td>
                                    <td>${returnedData.mtsOrangeAc}</td>
                                    <td>${returnedData.mtsBtcAc}</td>
                                    <td>${returnedData.zimmer2Ac}</td>
                                    `;
                                     
                                    tableList.appendChild(row);       
                        	        /*tableListDefault.remove();*/
                            });

                        });

                        var roundValueWlc = 0;

                        db.collection('Welcome').where('dayString','==', `${dateSearched}`).orderBy("timestamp").get().then((snapshot) => {    
                            snapshot.docs.forEach(doc => {
                                roundValueWlc++;
                                const returnedDataWlc = doc.data();           
                                const tableListTwo = document.querySelector("#tablelistWlc");
                                const row = document.createElement('tr');        
                                row.innerHTML = `
                                    <td id = "table-column-heading">Round ${roundValueWlc}</td>
                                    <td>${returnedDataWlc.mascomNzamelaWlc}</td>
                                    <td>${returnedDataWlc.orangeNzamelaWlc}</td>
                                    <td>${returnedDataWlc.btcNzamelaWlc}</td>`;
                                    
                                     
                                    tableListTwo.appendChild(row);       
                                    /*tableListTwoDefault.remove();*/
                            });
        
                        });
            };

        });
}

getAndDisplayData(dateSearched)
// Remove session storage
sessionStorage.removeItem("date-passed");

document.querySelector("#back-arrow").addEventListener('click', () => {          


    console.log('back-arrow dateSearched', dateSearched)
    const dateSearchedSplit = dateSearched.split("-")
    console.log('backarrow DateSplit is', dateSearchedSplit)
    const today = new Date(`${dateSearchedSplit[2]}`,`${dateSearchedSplit[1]}`,`${dateSearchedSplit[0]}`)
    console.log('today is', today)
    const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday.toDateString();

    const yestDate = yesterday.getDate();
    const yestMonth = yesterday.getMonth();
    const yestYear = yesterday.getFullYear();
    let yestString = `${yestDate}-${yestMonth}-${yestYear}`;
    console.log('backarrow yeststrng is', yestString)
    dateSearched = yestString

    getAndDisplayData(dateSearched)
    setTimeout(() => {
        UI.showDate(dateSearched)},100)

    setTimeout(() => {
        const tableAc = document.getElementById("tablelistAc");
          tableAc.innerHTML = "";

        const tableWlc = document.getElementById("tablelistWlc");
          tableWlc.innerHTML = ""; 
      }, 250)
    const errorMessage = document.querySelector('#errorMessageSection');
                      errorMessage.innerHTML = ""   
      
})

document.querySelector("#forward-arrow").addEventListener('click', () => {          


    console.log('back-arrow dateSearched', dateSearched)
    const dateSearchedSplit = dateSearched.split("-")
    console.log('backarrow DateSplit is', dateSearchedSplit)
    const today = new Date(`${dateSearchedSplit[2]}`,`${dateSearchedSplit[1]}`,`${dateSearchedSplit[0]}`)
    console.log('today is', today)
    const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.toDateString();

    const tomoDate = tomorrow.getDate();
    const tomoMonth = tomorrow.getMonth();
    const tomoYear = tomorrow.getFullYear();
    let tomoString = `${tomoDate}-${tomoMonth}-${tomoYear}`;
    console.log('forwardarrow tomostrng is', tomoString)
    dateSearched = tomoString

    getAndDisplayData(dateSearched)
    setTimeout(() => {
        UI.showDate(dateSearched)},100)

    setTimeout(() => {
        const tableAc = document.getElementById("tablelistAc");
          tableAc.innerHTML = "";

        const tableWlc = document.getElementById("tablelistWlc");
          tableWlc.innerHTML = ""; 
      }, 250)
    const errorMessage = document.querySelector('#errorMessageSection');
                      errorMessage.innerHTML = ""   
      
})

let tableIcon = document.querySelector('#tableIcon');
let winLocation = "table";

function changeStyle() {
    console.log(winLocation)
    if (winLocation ===  "table") {
        tableIcon.style.color = "#8f9499";
        
    }
}

changeStyle()


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
    window.location = "table.html";
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
    window.location = "table.html";
})


//datepicker init
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      format:'d-mmm-yyyy',

    });
  });


