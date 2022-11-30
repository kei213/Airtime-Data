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
            <span class='dropdown-trigger' href='#' data-target='dropdown1'>
                <i class = "material-icons">menu</i>
            </span>
        </div>
        
        <ul id='dropdown1' class='dropdown-content'>    
          <li><a href="" class="modal-trigger" id = 'logout' data-target="modal2" ><i class = "material-icons">search</i>Search</a></li>   
          <li><a href="" id = 'logout'><i class = "material-icons">table</i>View Records</a></li>  
          <hr class="hr"></hr>  
          <li><a href="/sessionLogout" id = 'logout'><i class = "material-icons">logout</i>Log Out</a></li>
        </ul>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </div>
    `;
  }
}

customElements.define('navbar-component', Navbar);

const homeIcon = document.querySelector("#homeIcon")
console.log(homeIcon)
homeIcon.addEventListener('click', () => {
  window.location = "/index"
})

const navbar = document.querySelector(".navbar")
console.log(navbar)
navbar.script = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
console.log(navbar)



