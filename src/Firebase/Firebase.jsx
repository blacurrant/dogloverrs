import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC-3XFcKKY_gsy11k6aQhaiJWQ7V6EUZOM",
  authDomain: "doglovers-ba6e3.firebaseapp.com",
  projectId: "doglovers-ba6e3",
  storageBucket: "doglovers-ba6e3.appspot.com",
  messagingSenderId: "1006198633141",
  appId: "1:1006198633141:web:9e5b5b2c1400fce54a44fc"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;