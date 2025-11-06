import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginafrikart.firebaseapp.com",
  projectId: "loginafrikart",
  storageBucket: "loginafrikart.firebasestorage.app",
  messagingSenderId: "363010005613",
  appId: "1:363010005613:web:58bde8fe46a70e7c463d64",
  measurementId: "G-0W61K7DT7P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics };