// import firebase from "firebase/app"
// import "firebase/auth"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCghcwDwEMVEXTZlyW2P28YWLO1_19M1gg",
  authDomain: "auth-development-f8665.firebaseapp.com",
  projectId: "auth-development-f8665",
  storageBucket: "auth-development-f8665.appspot.com",
  messagingSenderId: "541307538681",
  appId: "1:541307538681:web:fe572f92cace12800fa628",
});

export const auth = app.auth();
export default app;
