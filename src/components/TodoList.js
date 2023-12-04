import React from 'react'

const TodoList = ({todos,setTodos}) => {

  return (
    <div>
      {todos.map((todo)=>(
        <li className='list-item' key={todo.id}>
           <input type="text"
             className='list'
             value={todo.title}
             onChange={(event)=>event.preventDefault()}                     
             />
        </li>
      ))}
    </div>
  )
}

export default TodoList