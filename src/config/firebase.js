import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBFdJsFvzcdOaLOfgkBAoxipQ4dILMpvF0",
  authDomain: "saylaniassignments-302ed.firebaseapp.com",
  databaseURL: "https://saylaniassignments-302ed.firebaseio.com",
  projectId: "saylaniassignments-302ed",
  storageBucket: "saylaniassignments-302ed.appspot.com",
  messagingSenderId: "364783024115",
  appId: "1:364783024115:web:d195818957602cda8dc486",
  measurementId: "G-4D4J9TEV5S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 export default firebase;

