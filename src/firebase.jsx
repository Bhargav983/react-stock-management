// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-ThuPJ3JZOBwRRM82olDJAGtWIUsyPDU",
  authDomain: "contactusform-2712e.firebaseapp.com",
  databaseURL: "https://contactusform-2712e-default-rtdb.firebaseio.com",
  projectId: "contactusform-2712e",
  storageBucket: "contactusform-2712e.appspot.com",
  messagingSenderId: "518273722801",
  appId: "1:518273722801:web:1a9c620c25a18edfc3f590"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};