import React,{useState, useEffect} from "react";
// import Form from "./components/Form";
// import TodoList from "./components/TodoList";
// import Data from "./components/Data";

// import { database } from './firebase/firebase_config';
// import { ref, onValue, off } from 'firebase/database';

const App = () => {
  
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(response => {
        if (!response.ok) {
          console.log('3');
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTodos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todos && Object.entries(todos).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
