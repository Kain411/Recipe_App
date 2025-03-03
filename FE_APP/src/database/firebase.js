import { initializeApp, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHyxJXbD7GzRrjodX4CC_4_o1zXW0ss7M",
  authDomain: "recipe-app-8e402.firebaseapp.com",
  projectId: "recipe-app-8e402",
  storageBucket: "recipe-app-8e402.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:722710798886:android:79710d468dc33cb66c3ce7"
};

const app = getApp.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword }