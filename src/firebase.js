// import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvK1NJpbeTnWQCoSGcfFp0OMw7-tQgeUs",
  authDomain: "fir-proyecto4.firebaseapp.com",
  projectId: "fir-proyecto4",
  storageBucket: "fir-proyecto4.appspot.com",
  messagingSenderId: "84012680763",
  appId: "1:84012680763:web:c0209d01650d08e065be1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicialice Cloud Firestore y obtenga una referencia al servicio
const db = getFirestore(app);

export default db