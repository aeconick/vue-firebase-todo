import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPrU-gmW2ep1glcuekKchPq0vTRB8ZZ2U",
  authDomain: "vue-todo-858e5.firebaseapp.com",
  projectId: "vue-todo-858e5",
  storageBucket: "vue-todo-858e5.appspot.com",
  messagingSenderId: "714006567808",
  appId: "1:714006567808:web:7b7e9067c0d6190afd3f65",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
