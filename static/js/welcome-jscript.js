console.log("welcome-script.js");

import { initFirebase } from './initFirebase.js'

let apiKey = sessionStorage.getItem("apiKey")
initFirebase(apiKey)
  

const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

// Page Navigation
function clickedButton(conditions) {
	if (conditions === true){	  
      window.location = 'table';
    }

};

//UI class: Handles UI tasks

class UI {
	static showDate(dateString) {
        const dateDisplay = document.getElementById('date-display');        
        dateDisplay.innerHTML = dateString;
        
	}


	static clearFields() {
		setTimeout(() => {
		document.querySelector('#mascomNzamelaWlc').value = "";
		document.querySelector('#orangeNzamelaWlc').value = "";
		document.querySelector('#btcNzamelaWlc').value = "";
		}
        ,500)
	}	
}

function clearModal(instance) {		
	console.log('clearModal')
	console.log('instance', instance)
	    instance.destroy();
}

//Initialize dropdownOne menu for All Zeros
document.addEventListener('DOMContentLoaded', function() {
    var elemsOne = document.querySelectorAll('.dropdown-trigger');
    var instancesOne = M.Dropdown.init(elemsOne);
  });

//Automatically fill in Zeros 
document.querySelector('#allZerosOne').addEventListener("click", (e) => {
	document.querySelector('#labelMnzWlc').click();
	document.querySelector('#mascomNzamelaWlc').value = 0;

	document.querySelector('#labelOnzWlc').click();
	document.querySelector('#orangeNzamelaWlc').value = 0;

	document.querySelector('#labelBtcnzWlc').click();
	document.querySelector('#btcNzamelaWlc').value = 0;

    	
})

let roundToBeDone = sessionStorage.getItem("roundToBeDone")
console.log('round to be done is', roundToBeDone)

document.querySelector("#roundToBeDone").innerText = roundToBeDone;
document.querySelector("#roundToBeDoneFormOne").innerText = roundToBeDone;

document.querySelector("#buttonRound").innerText = roundToBeDone;

const date = new Date();
var dateString = date.toDateString();
UI.showDate(dateString);

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let dayString = `${day}-${month}-${year}`;
    console.log('WLC dayString is', dayString)
// Get values from form
let conditions = false;

document.querySelector('#btn').addEventListener("click", (e) => {

	// Prevent actual submit
     e.preventDefault();

	 const mascomNzamelaWlc = document.querySelector('#mascomNzamelaWlc').value;
	 const orangeNzamelaWlc = document.querySelector('#orangeNzamelaWlc').value;
	 const btcNzamelaWlc = document.querySelector('#btcNzamelaWlc').value;
	      

	if (mascomNzamelaWlc === "" || orangeNzamelaWlc === "" || btcNzamelaWlc === "") {

       //show modal
       var elems = document.querySelector('.modal')
       var instances = M.Modal.init(elems, {onCloseEnd: () => {
       	   var instance = M.Modal.getInstance(elems)
       	   clearModal(instance)
       }}) 

	} else {
        
		conditions = true;

		// Store values in Firebase
		if (roundToBeDone === '1') {
		   db.collection("Welcome").add({
            dayString: dayString,
            dateString: dateString,            
            vendor: "Welcome",            
			mascomNzamelaWlc: mascomNzamelaWlc,
			orangeNzamelaWlc: orangeNzamelaWlc,
			btcNzamelaWlc: btcNzamelaWlc,			
			timestamp:firebase.firestore.FieldValue.serverTimestamp()

		    }) 

		    db.collection("Round").doc('roundData').set({
			dayString: dayString,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			roundStatus: roundToBeDone,
			}).then( user => {
           
            // Function to move onto next page
			clickedButton(conditions);

			});;
		
		     // Clear input fields
		    UI.clearFields();
        }
        

		if (roundToBeDone === '2') {
		   db.collection("Welcome").add({
            dayString: dayString,
            dateString: dateString,            
            vendor: "Welcome",            
			mascomNzamelaWlc: mascomNzamelaWlc,
			orangeNzamelaWlc: orangeNzamelaWlc,
			btcNzamelaWlc: btcNzamelaWlc,			
			timestamp:firebase.firestore.FieldValue.serverTimestamp()

		    }) 

		    db.collection("Round").doc('roundData').set({
			dayString: dayString,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			roundStatus: roundToBeDone,
			}).then( user => {
           
            // Function to move onto next page
			clickedButton(conditions);

			});;
		
		     // Clear input fields
		    UI.clearFields();
        }    
	}
});