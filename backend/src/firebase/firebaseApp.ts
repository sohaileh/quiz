import {initializeApp} from 'firebase/app'
import { getStorage, ref } from 'firebase/storage';
// import { getStorage, ref } from "firebase/storage";
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyC5pxZ4eoGOy3iycySUe-aV_SkOLTLYQc0",
  authDomain: "quiz-7dc17.firebaseapp.com",
  projectId: "quiz-7dc17",
  storageBucket: "quiz-7dc17.appspot.com",
  messagingSenderId: "153410199743",
  appId: "1:153410199743:web:899088ec2cb1e19552a60a"
});




export const storage = getStorage(firebaseApp)

