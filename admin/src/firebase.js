import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "netflix-adb08.firebaseapp.com",
  projectId: "netflix-adb08",
  storageBucket: "netflix-adb08.appspot.com",
  messagingSenderId: "439495202239",
  appId: "1:439495202239:web:3eee3c43e4ee8e5a42bd0a",
  measurementId: "G-8B0Y1MBXEJ",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
