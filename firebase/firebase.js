// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKjMS_m_l6LwjoTnkkxcpCHlqLOSNjnmI",
  authDomain: "skindisease-396e1.firebaseapp.com",
  projectId: "skindisease-396e1",
  storageBucket: "skindisease-396e1.appspot.com",
  messagingSenderId: "371795492561",
  appId: "1:371795492561:web:529216101f200b46688ff0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export default app;
