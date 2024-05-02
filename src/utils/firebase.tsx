// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOC_bSrtQmV7l1CR2Uhq0fzVylf9DiwmY",
    authDomain: "paintbin-708ef.firebaseapp.com",
    projectId: "paintbin-708ef",
    storageBucket: "paintbin-708ef.appspot.com",
    messagingSenderId: "806612175656",
    appId: "1:806612175656:web:a82a845e1e18425f429e1d",
    measurementId: "G-MHCYTE903N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
const auth = getAuth();

// export function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
// }
// export function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
// }
export function Logout() {
    return signOut(auth);
}
//custom hook for signUp
// export function UseAuth() {
//     const [currentUser, setCurrentUser] = useState();
//     useEffect(() => {
//         const account = onAuthStateChanged(auth, (user) => {

//             if(user == null){
//                 return;
//             }
//             else{
//                 setCurrentUser(user);
//             }
            
//         });
//         return account;
//     }, []);
//     return currentUser;
// }