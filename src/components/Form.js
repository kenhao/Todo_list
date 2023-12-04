import React from 'react';
import {v4 as uuidv4} from "uuid";

const Form = ({input,setInput,todos,setTodos}) => {

    const onInputChange = (event) =>{
       setInput(event.target.value);
    };
     
    const onFormSubmit =(event)=>{
       event.preventDefault(); //停止執行事件的默認動作
       setTodos([...todos,{id:uuidv4(),title:input,completed:false}]);
       setInput("");
    };

  return (
    <form onSubmit = {onFormSubmit}>
       <input 
        type="text" 
        className='line-input' 
        placeholder='Enter a Todo...'
        value={input}
        require 
        onChange={onInputChange}

        />
       <button className='button-add' type='submit'>
           Add
       </button>
    </form>
  )
}

export default Form