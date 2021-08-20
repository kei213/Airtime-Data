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

//make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const signUpForm = document.querySelector('#signUpForm')
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // get user info
  const email = signUpForm['email'].value
  const password = signUpForm['password'].value
  
  // sign up user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user)
  })
  
  signUpForm.reset()
})

// logout
/*const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out')
  })
})*/