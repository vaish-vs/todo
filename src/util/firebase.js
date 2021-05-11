import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzFm3yXw4l7fxrkgtAJWvrOruci7CBFo0",
    authDomain: "todo-a081f.firebaseapp.com",
    projectId: "todo-a081f",
    storageBucket: "todo-a081f.appspot.com",
    messagingSenderId: "167557628821",
    appId: "1:167557628821:web:7f9620368883e996c56c9c",
    measurementId: "G-8STCEL1QZ0"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;