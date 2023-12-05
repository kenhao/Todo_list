const express = require('express');
const { database } = require('../firebase/firebase_config'); // 导入Firebase数据库实例
const { ref, set, update, remove, get } = require('firebase/database');
const app = express();

app.use(express.json()); // 解析JSON请求体

const port = 3001;

// create
app.post('/todo', (req, res) => {
  const newTodo = req.body;
  const newTodoRef = ref(database, 'todos/' + newTodo.id);
  set(newTodoRef, newTodo)
    .then(() => res.status(200).send('Todo added'))
    .catch(error => res.status(500).send(error));
});

// update
app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  const todoRef = ref(database, 'todos/' + id);
  update(todoRef, updatedTodo)
    .then(() => res.status(200).send('Todo updated'))
    .catch(error => res.status(500).send(error));
});

// delete
app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  const todoRef = ref(database, 'todos/' + id);
  remove(todoRef)
    .then(() => res.status(200).send('Todo deleted'))
    .catch(error => res.status(500).send(error));
});

// read
app.get('/todos', (req, res) => {
  const todosRef = ref(database, 'todos');
  get(todosRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json(snapshot.val());
      } else {
        res.status(404).send('No todos found');
      }
    })
    .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
