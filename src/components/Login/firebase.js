import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsEXIV0OTzWuRX4XBiVB4a-3w4bP_fnCs",
    authDomain: "chocolate-fiesta-cloud.firebaseapp.com",
    projectId: "chocolate-fiesta-cloud",
    storageBucket: "chocolate-fiesta-cloud.appspot.com",
    messagingSenderId: "419100703725",
    appId: "1:419100703725:web:42a642a456befea15045e4"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
