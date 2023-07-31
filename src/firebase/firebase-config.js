import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBVmY6eYN1rVVk6PadGXMmZyV-7GVhHoL4",
  authDomain: "monkey-blogging-80e27.firebaseapp.com",
  projectId: "monkey-blogging-80e27",
  storageBucket: "monkey-blogging-80e27.appspot.com",
  messagingSenderId: "178269939524",
  appId: "1:178269939524:web:bda91e41c4c65ca4489911",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
