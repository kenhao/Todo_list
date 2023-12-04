import React,{useState} from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {

  const [input,setInput] = useState("");
  const [todos,setTodos] = useState([]);

 return (
   <div className="container">
     <div className="app-box">
       <div>
         <h1 className='header'>TodoList</h1>
       </div>
       <div>
       <Form 
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
       </div> 
       <div>
         <TodoList
          todos = {todos}
          setTodos = {setTodos}
         />
       </div>       
     </div>       
   </div>
 );
}

export default App;
