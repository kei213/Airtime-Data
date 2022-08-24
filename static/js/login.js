// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initFirebase } from './initFirebase.js'

async function getApiKey() {

  const response = await fetch('/apiKey')
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json()
  initFirebase(data.key)
}

getApiKey()

// getting values from login gorm
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
            loginForm.querySelector('#errorMessage').innerText = 'loading...';   
            createSessionCookie(user)
        }).catch(err => {
          loginForm.querySelector('#errorMessage').innerText = err.code;
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
              throw new Error('Something went wrong !')
            }).catch(error => {
              console.log(error)
               loginForm.querySelector('#errorMessage').innerText = error;
            }) 
              
    })

}
