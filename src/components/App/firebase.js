import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDsEXIV0OTzWuRX4XBiVB4a-3w4bP_fnCs",
    authDomain: "chocolate-fiesta-cloud.firebaseapp.com",
    projectId: "chocolate-fiesta-cloud",
    storageBucket: "chocolate-fiesta-cloud.appspot.com",
    messagingSenderId: "419100703725",
    appId: "1:419100703725:web:42a642a456befea15045e4"
};

export const firebaseUserDrawingCollection = 'user-drawing';

export const firestoreAutoId = () => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    let autoId = ''
  
    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(
        Math.floor(Math.random() * CHARS.length)
      )
    }
    return autoId
  }

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
