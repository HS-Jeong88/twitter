import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBloOALmPMFFciZ51EhYQWpjiDEEay0Br0",
  authDomain: "twitter-ff56c.firebaseapp.com",
  databaseURL: "https://twitter-ff56c.firebaseapp.com/",
  projectId: "twitter-ff56c",
  storageBucket: "twitter-ff56c.appspot.com",
  messagingSenderId: "155612840456",
  appId: "1:155612840456:web:3ef1186123ecb6570947bd",
};

initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
