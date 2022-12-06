class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class = "navbar">  
        <span class = "app-name">Airtime data</span>    
        <div class = "heading-icon" id = "homeIcon" focusable="tabindex=-1">
            <span class='' href=''>
                <i class = "material-icons">home</i>
            </span>
        </div>    
        <div class = "heading-icon menu-icon">
            <span class='dropdown-trigger trigger' href='#' data-target='dropdown1'>
                <i class = "material-icons">menu</i>
            </span>
        </div>
        
        <ul id='dropdown1' class='dropdown-content'>    
          <li><a href="#" id="homeLink"><i class = "material-icons">table</i>Home</a></li>
          <li><a href="" class="modal-trigger" id = 'logout' data-target="search-modal" ><i class = "material-icons">search</i>Search</a></li>   
          <li><a href="/table"><i class = "material-icons">table</i>View Records</a></li>  
          <hr class="hr"></hr>  
          <li><a href="/sessionLogout" id = 'logout'><i class = "material-icons">logout</i>Log Out</a></li>
        </ul>
 
    </div>
    `;
  }
}

customElements.define('navbar-component', Navbar);

//event listener for the home icon on the navbar
const homeIcon = document.querySelector("#homeIcon")
homeIcon.addEventListener('click', () => {
  if (window.location.pathname == "/index") {
    return
  } else {
      window.location = "/index"
  }    
})

//event listener for the home link on the navbar
const homeLink = document.querySelector("#homeLink")
homeLink.addEventListener('click', () => {
  if (window.location.pathname == "/index") {
    return
  } else {
      window.location = "/index"
  }    
})

// init navbar menu modal
document.addEventListener('DOMContentLoaded', function() {
    const elemsNav = document.querySelector('.trigger'); // do not delete the trigger class
    console.log(elemsNav)  
    const instancesNav = M.Dropdown.init(elemsNav, {});

}); 



