const express = require('express');
const firebase = require('firebase/app');
const { getDatabase, ref, get, push, remove, update } = require('firebase/database');

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

// get all todos
app.get('/todos', (req, res) => {
    const databaseRef = ref(getDatabase(firebaseApp), 'todos');
    get(databaseRef).then((snapshot) => {
      res.json(snapshot.val()); // 回傳所有的todos
    }).catch((error) => {
      res.status(500).json({ error: error.message });
    });
  });
  
 
// add todo 
app.post('/todos', (req, res) => {
    const todo = req.body; // get todo from request body 
    const todosRef = ref(getDatabase(firebaseApp), 'todos');
    push(todosRef, todo) // add todo to database and ID will be generated in Firebase
      .then(() => res.status(200).send('Todo added'))
      .catch(error => res.status(500).json({ error: error.message }));
  });

// delete todo
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoRef = ref(getDatabase(firebaseApp), `todos/${id}`);
    remove(todoRef)
      .then(() => res.status(200).send('Todo deleted'))
      .catch(error => res.status(500).json({ error: error.message }));
  });

// update todo
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    const todoRef = ref(getDatabase(firebaseApp), `todos/${id}`);
    update(todoRef, updatedTodo)
      .then(() => res.status(200).send('Todo updated'))
      .catch(error => res.status(500).json({ error: error.message }));
  });


const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});