class Search extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `    
      <div id="search-modal" class="modal">
        <div class="modal-content">
            <div class = 'modal-close'>
              <label for = 'modalClose'><label>
              <p class="modal-close waves-effect waves-green btn-flat" id = 'modalClose'>X<p> 
            </div>
            <!--<span class="close" id = "close">&times;</span> -->

            <div class = "search-header-container">  
                <i class="material-icons search-icon" >search</i>  
                <span class = "search-heading">Search records</span>
            </div>

            <div class = "day-selector">
              <div class = "box"><a href = "" id = "yesterdayLink">Yesterday's Data</a></div>
              <!--<div class = "box short"><div class="vl"></div></div>-->
              <div class = "box"><a href = "table">Today's Data</a></div>
            </div> 

            <!--<hr></hr>-->

            <div class = "input-field-search-container">                  
              <div class = "calendar">
                <!--<label for="calendarIcon">pick a date:</label>-->
                <i class="material-icons " id = "calendarIcon" style = "color: #8f9499">date_range</i>
                <input type = "text" placeholder = "pick a date" class="datepicker" id = "date-input">
              </div>             
              <span class = "waves-effect waves-light btn-small searchButton" id = "search-button">SEARCH</span>
    
            </div>         
            
        </div>        
      </div>
    `;
  }
}

customElements.define('search-component', Search);

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

//Search modal 
var closeModal = document.querySelector('#modalClose')

document.addEventListener('DOMContentLoaded', function() {
    const elemsSearch = document.querySelector('#search-modal');
    const instancesSearch = M.Modal.init(elemsSearch);    
    
    // close search modal
    closeModal.addEventListener('click', (e) => {
      e.preventDefault()
      instancesSearch.close()

    })
});
