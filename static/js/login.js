// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.APIKEY

var firebaseConfig = {
    apiKey: apiKey,
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

//make auth and firestore references
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('onAuthStateChange - user logged in')
    
  } else {
    console.log('onAuthStateChange - user logged out')
  }
})

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {

    e.preventDefault()
    // get user info
    const email = loginForm['email'].value
    const password = loginForm['password'].value

    setTimeout(() => {
      loginForm.reset()
    }, 500)
  
   
    //sign up user
    /*auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user)
    })*/
  
    auth.signInWithEmailAndPassword(email, password)
        .then(({ user })=> {  
          loginForm.querySelector('#errorMessage').innerText = 'loading...';       
          return user.getIdToken().then((idToken) => {
            const userEmail = `${user.email}`
            console.log('e-mail is', userEmail)
            const userId = `${user.uid}`
            console.log('userId is', userId)
            return fetch('/sessionLogin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'CSRF-Token': Cookies.get('XSRF-TOKEN'),
              },
              body:JSON.stringify({ idToken, userEmail, userId }),              
            })
          })
        })
        .then(() => {
          //console.log('firebase signout')
          //return auth.signOut();
        })
        .then(() => {
          console.log('window location')
          window.location.assign('/index')  
          //window.location = 'index' 
        }).catch(err => {
          loginForm.querySelector('#errorMessage').innerText = err.code;
        })
        return false;   
})
