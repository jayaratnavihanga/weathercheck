import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDISmNIORQD434QfsB7l97sw6VLB3Ymgqw",
    authDomain: "weather-check-46169.firebaseapp.com",
    projectId: "weather-check-46169",
    storageBucket: "weather-check-46169.firebasestorage.app",
    messagingSenderId: "700493358230",
    appId: "1:700493358230:web:8bb76b5e5e4f0ac66bceb7",
    measurementId: "G-GVYNPEW0LF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {app,auth}