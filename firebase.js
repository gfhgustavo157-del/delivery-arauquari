import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKTYAsPIOGy90KKMhqK1dxq_qFpLACR_s",
  authDomain: "delivery-arauquari-dce36.firebaseapp.com",
  projectId: "delivery-arauquari-dce36",
  storageBucket: "delivery-arauquari-dce36.firebasestorage.app",
  messagingSenderId: "748442806658",
  appId: "1:748442806658:web:63a5161fa048464b35c79b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
