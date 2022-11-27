console.log("airtime-center-script.js");
// import { initFirebase } from './initFirebase.js'

/*let apiKey = sessionStorage.getItem("apiKey")
initFirebase(apiKey)*/
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

// Page Navigation
function clickedButton(conditions, roundToBeDone) {
	if (conditions === true){
	  sessionStorage.setItem("roundToBeDone", roundToBeDone)
      window.location = 'welcome-form';
    }

};

//UI class: Handles UI tasks

class UI {

	static showDate(dateString) {
        const dateDisplay = document.getElementById('date-display');        
        dateDisplay.innerHTML = dateString;
        
	}

	static showAlert() {
        const modal = document.querySelector("#modal1")		
        modal.style.display = 'block'
	}

	static clearFields() {
		setTimeout(() => {
		document.querySelector('#mascomNzamelaAc').value = "";
		document.querySelector('#orangeNzamelaAc').value = "";
		document.querySelector('#btcNzamelaAc').value = "";
		document.querySelector('#myzakaAc').value = "";
		document.querySelector('#zimmer1Ac').value = "";
		document.querySelector('#smegaAc').value = "";

        document.querySelector('#mtMasAc').value = "";
        document.querySelector('#mtOraAc').value = "";
        document.querySelector('#mtBtcAc').value = "";
		document.querySelector('#zimmer2Ac').value = "";
	    }
        ,500)
	}
	
}

let roundToBeDone = sessionStorage.getItem("roundToBeDone")
console.log('round to be done is', roundToBeDone)

//Set round value
document.querySelector("#roundToBeDone").innerText = roundToBeDone;
document.querySelector("#roundToBeDoneFormOne").innerText = roundToBeDone;
document.querySelector("#roundToBeDoneFormTwo").innerText = roundToBeDone;

// Get date
const date = new Date();
let dateString = date.toDateString();
UI.showDate(dateString);

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let dayString = `${day}-${month}-${year}`;
console.log('AC daystring is',dayString);


// Get values from form
let conditions = false;

// function to clear modal
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
	document.querySelector('#labelMnzAc').click();
	document.querySelector('#mascomNzamelaAc').value = 0;

	document.querySelector('#labelOnzAc').click();
	document.querySelector('#orangeNzamelaAc').value = 0;

	document.querySelector('#labelBnzAc').click();
	document.querySelector('#btcNzamelaAc').value = 0;

	document.querySelector('#labelMzkAc').click();
	document.querySelector('#myzakaAc').value = 0;

	document.querySelector('#labelZmOneAc').click();
	document.querySelector('#zimmer1Ac').value = 0;	

    document.querySelector('#labelSmegaAc').click();
	document.querySelector('#smegaAc').value = 0;
	
})

//Initialize dropdownTwo menu for All Zeros
document.addEventListener('DOMContentLoaded', function() {
    var elemsTwo = document.querySelectorAll('.dropdown-trigger');
    var instancesTwo = M.Dropdown.init(elemsTwo);
  });

//Automatically fill in Zeros 
document.querySelector('#allZerosTwo').addEventListener("click", (e) => {
	document.querySelector('#labelmtMasAc').click();
	document.querySelector('#mtMasAc').value = 0;

	document.querySelector('#labelmtOraAc').click();
	document.querySelector('#mtOraAc').value = 0;

	document.querySelector('#labelmtBtcAc').click();
	document.querySelector('#mtBtcAc').value = 0;

	document.querySelector('#labelZmTwoAc').click();
	document.querySelector('#zimmer2Ac').value = 0;

		
})


// Get Values from form and submit them to Firebase
document.querySelector('#btn').addEventListener("click", (e) => {

	// Prevent actual submit
     e.preventDefault();
     
	 const mascomNzamelaAc = document.querySelector('#mascomNzamelaAc').value;
	 const orangeNzamelaAc = document.querySelector('#orangeNzamelaAc').value;
	 const btcNzamelaAc = document.querySelector('#btcNzamelaAc').value;
	 const myzakaAc = document.querySelector("#myzakaAc").value;
	 const zimmer1Ac = document.querySelector("#zimmer1Ac").value;	 
	 const smegaAc = document.querySelector("#smegaAc").value;

     const mtsMascomAc = document.querySelector('#mtMasAc').value;
	 const mtsOrangeAc = document.querySelector('#mtOraAc').value;
	 const mtsBtcAc = document.querySelector('#mtBtcAc').value;
	 const zimmer2Ac = document.querySelector("#zimmer2Ac").value;
     

	if (mascomNzamelaAc === "" || orangeNzamelaAc === "" || btcNzamelaAc === ""
		 || myzakaAc === "" || zimmer1Ac === "" || smegaAc === "" || mtsMascomAc === "" || mtsOrangeAc === "" 
		 || mtsBtcAc === "" || zimmer2Ac === "") {
		
       //show modal
       var elems = document.querySelector('.modal')
       var instances = M.Modal.init(elems, {onCloseEnd: () => {
       	   var instance = M.Modal.getInstance(elems)
       	   clearModal(instance)
       }})                                                

	} else {
        
		conditions = true;				
		
		// Store values in Firebase
		db.collection("Airtime Center").add({
            dayString: dayString,
            dateString: dateString,            
            vendor: "Airtime Center",           
			mascomNzamelaAc: mascomNzamelaAc,
			orangeNzamelaAc: orangeNzamelaAc,
			btcNzamelaAc: btcNzamelaAc,
			myzakaAc: myzakaAc,
			zimmer1Ac: zimmer1Ac,
			smegaAc: smegaAc,
            mtsMascomAc: mtsMascomAc,
            mtsOrangeAc: mtsOrangeAc,
            mtsBtcAc: mtsBtcAc,
			zimmer2Ac: zimmer2Ac,
			timestamp:firebase.firestore.FieldValue.serverTimestamp()

		}).then( user => {

            // Function to move onto next page
			clickedButton(conditions, roundToBeDone);

			});
		
		// Clear input fields
		UI.clearFields();
       
	}     
	
});

//transition
const main = document.querySelector(".main-container");

function init() {  
    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 50)        
}

init();



