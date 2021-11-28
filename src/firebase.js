import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6v_WAYfTqYF2hd7NyCh9Qr8B89Ey0lUQ",
  authDomain: "soundhouse1-698c5.firebaseapp.com",
  projectId: "soundhouse1-698c5",
  storageBucket: "soundhouse1-698c5.appspot.com",
  messagingSenderId: "486316867669",
  appId: "1:486316867669:web:49ce9c593930fda77e54dc",
  measurementId: "G-QFMSHR77L7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
  
export { db, auth }