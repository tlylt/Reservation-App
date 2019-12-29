//Login in credentials for firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Your API Key",
  authDomain: "Your auth domain",
  databaseURL: "url",
  projectId: "id",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//for usage later in the app
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
