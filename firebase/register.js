import { initializeApp } from "firebase/app";
import{
    getFireStore, collection, onSnapShot,
    query, addDoc, doc, where, orderBy, limit,
    getDoc, updateDoc, getDocs, setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCGi7d3hQFtXooGw_HosUqGrH0dBJYojYI",
    authDomain: "damp-c7a9d.firebaseapp.com",
    projectId: "damp-c7a9d",
    storageBucket: "damp-c7a9d.appspot.com",
    messagingSenderId: "1045743798558",
    appId: "1:1045743798558:web:8ac8bd44114553396ee10f"
  };

initializeApp(firebaseConfig);

const db = getFireStore();

const colRef = collection(db, 'Users');

const registerUserForm = document.querySelector('.register_user');
registerUserForm.addEventListener('sumbit', async (e) => {
    e.preventDefault();

    console.log('Form Submitted')

    addDoc(colRef, {
        "Username": registerUserForm.username.value,
    })
    .then(() => {
        registerUserForm.reset()
    })
})