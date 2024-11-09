// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKT6kBKHB3nKXYSmtpvz6lDfIss3FR4JU",
  authDomain: "nextjsproject-85afc.firebaseapp.com",
  projectId: "nextjsproject-85afc",
  storageBucket: "nextjsproject-85afc.firebasestorage.app",
  messagingSenderId: "226794536421",
  appId: "1:226794536421:web:f67e475f3c731f55c5830c",
  measurementId: "G-LXFJE4MM95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
