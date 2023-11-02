// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_apiKey,
//   authDomain: process.env.NEXT_PUBLIC_authDomain,
//   projectId: process.env.NEXT_PUBLIC_projectId,
//   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
//   appId: process.env.NEXT_PUBLIC_appId,
//   measurementId: process.env.NEXT_PUBLIC_measurementId,
// };

// temp setup

const firebaseConfig = {
  apiKey: "AIzaSyDIPqB2os-Cy9i6Qy_m2J-wFRl_FArdmKw",
  authDomain: "gurmukh-portfolio-dashboard.firebaseapp.com",
  projectId: "gurmukh-portfolio-dashboard",
  storageBucket: "gurmukh-portfolio-dashboard.appspot.com",
  messagingSenderId: "180286311081",
  appId: "1:180286311081:web:3117ce90445a48716af7b8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)


