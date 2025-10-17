import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPp85p7R1yZZvkccgbqByju3WpBYNR2JE",
    authDomain: "jeevancare-d0d40.firebaseapp.com",
    projectId: "jeevancare-d0d40",
    storageBucket: "jeevancare-d0d40.firebasestorage.app",
    messagingSenderId: "55540774629",
    appId: "1:55540774629:web:26b9fea92331f8812cc60c",
    measurementId: "G-BRET7272GN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
