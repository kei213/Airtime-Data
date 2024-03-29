import { initFirebase } from './initFirebase.js'

// get apiKey from server
async function getApiKey() {
  console.log('getApikey called')
  const response = await fetch('/apiKey')
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json()
  const apiKey = data.key
  //set apiKey to session storage
  sessionStorage.setItem("apiKey", apiKey)
  initFirebase(apiKey)
}
getApiKey()

// getting values from login form
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {

    e.preventDefault()
    // get user info
    const email = loginForm['email'].value
    const password = loginForm['password'].value
    
    signInWithEmailAndPassword(email, password)

    setTimeout(() => {
      loginForm.reset()
    }, 300)  
})   
    //sign up user
    /*auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user)
    })*/  

function signInWithEmailAndPassword(email, password) {  
    
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(({ user })=> {  
            const loginContainer = document.querySelector(".login-container") ;
            const loginLoader = document.querySelector(".login-loader") ;
            loginContainer.style.display = 'none';
            loginLoader.style.display = 'block';   
            createSessionCookie(user)
        }).catch(err => {
          loginForm.querySelector('#errorMessage').innerText = `${err.code}, try again`;
        })         
} 
        

function createSessionCookie(user) {

    user.getIdToken().then((idToken) => {
            const userEmail = `${user.email}`            
            const userId = `${user.uid}`

            fetch('/sessionLogin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': Cookies.get('XSRF-TOKEN'),
              },
              body:JSON.stringify({ idToken, userEmail }),              
            }).then((response) => {
              if (response.ok) {
                window.location.assign('/index') 
              }
            }).catch(error => {
              console.log(error)
               loginForm.querySelector('#errorMessage').innerText = error;
            }) 
              
    })

}
