import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDzST8CcJX4Gu-vAWuQKC7lwqtJ7s9IhZc",
    authDomain: "combustivel-37835.firebaseapp.com",
    projectId: "combustivel-37835",
    storageBucket: "combustivel-37835.appspot.com",
    messagingSenderId: "1328251049",
    appId: "1:1328251049:web:12ac596e3a3ad8fde429b8"
  };
  
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 