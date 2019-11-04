//Login in credentials for firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLyaLaT8fbNXoSb_MIgL9MEglKu6SUhoI",
  authDomain: "reservation-app-e9376.firebaseapp.com",
  databaseURL: "https://reservation-app-e9376.firebaseio.com",
  projectId: "reservation-app-e9376",
  storageBucket: "reservation-app-e9376.appspot.com",
  messagingSenderId: "1089395231766",
  appId: "1:1089395231766:web:53f971b387d2ebb0daf937"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//for usage later in the app
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
