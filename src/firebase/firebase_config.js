import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const config = {
    apiKey: "AIzaSyAH5XWoZQ75E_XcE-dTTncQBJPObND8q9k",
    authDomain: "todo-list-da3c5.firebaseapp.com",
    projectId: "todo-list-da3c5",
    storageBucket: "todo-list-da3c5.appspot.com",
    messagingSenderId: "114661391534",
    appId: "1:114661391534:web:f3db5cb8994c09e77e813f",
    measurementId: "G-K0M069SCNV"
};

const app = initializeApp(config);
const database = getDatabase(app);

export { database };
