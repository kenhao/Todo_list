const express = require('express');
const firebase = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

require('firebase/database');

const cors = require('cors');

// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyAH5XWoZQ75E_XcE-dTTncQBJPObND8q9k",
    authDomain: "todo-list-da3c5.firebaseapp.com",
    projectId: "todo-list-da3c5",
    storageBucket: "todo-list-da3c5.appspot.com",
    messagingSenderId: "114661391534",
    appId: "1:114661391534:web:f3db5cb8994c09e77e813f",
    measurementId: "G-K0M069SCNV"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = express();

// use cors to allow cross origin resource sharing
app.use(cors());

// use express-json to parse json data
app.use(express.json());

app.get('/todos', (req, res) => {
    const databaseRef = ref(getDatabase(firebaseApp), 'todos');
    onValue(databaseRef, (snapshot) => {
      res.json(snapshot.val());
    }, (error) => {
      res.status(500).json({ error: error.message });
    });
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});