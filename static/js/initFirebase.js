export function initFirebase(apiKey) {

  let firebaseConfig = {
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

}