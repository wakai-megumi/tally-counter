// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtB5pkDbk6sd5QAL61RdsoHtPwyxvqeEo",
    authDomain: "counter-assignment.firebaseapp.com",
    projectId: "counter-assignment",
    storageBucket: "counter-assignment.appspot.com",
    messagingSenderId: "86505545528",
    appId: "1:86505545528:web:841aaaa9412d6ce8f36bcd",
    measurementId: "G-VMDKQKGWXE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { firestore, auth }