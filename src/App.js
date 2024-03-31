import React,{useState, useEffect} from "react";
import './App.css';
// import Form from "./components/Form";
// import TodoList from "./components/TodoList";
// import Data from "./components/Data";

// import { database } from './firebase/firebase_config';
// import { ref, onValue, off } from 'firebase/database';

const App = () => {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  // fetch todos
  const fetchTodos = () => {
    fetch('http://localhost:3001/todos')
      .then(response => response.json())
      .then(data => setTodos(data || {}))
      .catch(error => console.error('Error:', error));
  };

  // add todo
  const addTodo = () => {
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo })
    }).then(() => {
      fetchTodos();
      setNewTodo('');
    });
  }

  // delete todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    }).then(() => {
      fetchTodos();
    });
  }

  // start editing todo
  const startEdit = (id, title) => {
    setEditing(id);
    setEditText(title);
  };

  // confirm editing todo
  const confirmEdit = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editText })
    }).then(() => {
      setEditing(null);
      fetchTodos();
    });
  };



  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {Object.entries(todos).map(([key, value]) => (
          <li key={key}>
          {editing === key ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            value.title
          )}
          {editing === key ? (
            <button onClick={() => confirmEdit(key)}>Confirm</button>
          ) : (
            <>
              <button onClick={() => deleteTodo(key)}>Delete</button>
              <button onClick={() => startEdit(key, value.title)}>Update</button>
            </>
          )}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
