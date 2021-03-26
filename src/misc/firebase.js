import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyD6djL0UNyAn3w4Nvl6ECkgEwcEPa7XKrw",
    authDomain: "react-chat-3e876.firebaseapp.com",
    databaseURL: "https://react-chat-3e876-default-rtdb.firebaseio.com",
    projectId: "react-chat-3e876",
    storageBucket: "react-chat-3e876.appspot.com",
    messagingSenderId: "763660417252",
    appId: "1:763660417252:web:d9c28d97c980b81a4d14f1"
};
  
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.database();