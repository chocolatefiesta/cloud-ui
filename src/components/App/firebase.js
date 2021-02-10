import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";


export const firebaseConfig = {
    apiKey: "AIzaSyDsEXIV0OTzWuRX4XBiVB4a-3w4bP_fnCs",
    authDomain: "chocolate-fiesta-cloud.firebaseapp.com",
    projectId: "chocolate-fiesta-cloud",
    storageBucket: "chocolate-fiesta-cloud.appspot.com",
    messagingSenderId: "419100703725",
    appId: "1:419100703725:web:42a642a456befea15045e4",
    measurementId: "G-FRZNRK641V"
};

export const storageUserFolder = 'user';
export const firestoreUserDrawingCollection = 'user-drawing';
export const userDrawingGcodeFilename = 'drawing.gcode';

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
export const storage = firebase.storage();
export const analytics = firebase.analytics();

export const firestoreUserDrawingDocument = (uid) => {
  return db.collection(firestoreUserDrawingCollection).doc(uid)
}

export const storageUserDrawingGcodeRef = (uid) => {
  return storage.ref(storageUserFolder).child(uid).child(userDrawingGcodeFilename)
}
