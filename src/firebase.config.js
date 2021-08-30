// Firebase deps
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

var db
export const initializeFirebase = () => {
    // if (!firebase.apps.length) {
    initializeApp({
        apiKey: "AIzaSyBhz5Xy1YRQmy_C36OUAn_mI0ao-88aP58",
        authDomain: "avatar-garments-console.firebaseapp.com",
        projectId: "avatar-garments-console",
        storageBucket: "avatar-garments-console.appspot.com",
        messagingSenderId: "229655194643",
        appId: "1:229655194643:web:5b84a54f4c2ec77ca863e6"
    });
    db = getFirestore();
}

export default db;
