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
      .then(data => setTodos(data || {})) // 這裡的data是從server.js的res.json(snapshot.val())來的，用來獲取所有的todos，其中包括id和title形成的物件 // || 可以理解成or，如果data是null或undefined，則todos為空物件
      .catch(error => console.error('Error:', error));
  };

  // add todo
  const addTodo = () => {
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }) // 將newTodo轉成json格式
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
  const startEdit = (id, title) => { // 開啟編輯模式，並將id和title傳入Editing和EditText
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
        {Object.entries(todos).map(([key, value]) => ( // 這裡的key是id，value是title
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
          {editing === key ? ( // 如果editing等於key(editing 原本是null，當startEdit被觸發後，editing會變成id)，則顯示Confirm，否則顯示Delete和Update
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
