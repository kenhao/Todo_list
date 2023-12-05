import React ,{useState,useEffect} from 'react'
import axios from 'axios'

const Data = () => {
    const [post,setPost] = useState({});
    const [id,setId] = useState();
    const [buttonId, setButtonId] = useState();

    const handleClick=()=>{
      setButtonId(id);
    }

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/${buttonId}`)
            .then(res=>{
                console.log(res)
                setPost(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[buttonId])

    return (
        <div className="app-box">
        <input 
        type="text"
        className='line-input' 
        placeholder='Enter Number...' 
        require 
        value={id}  
        onChange={e => setId(e.target.value)}  
        />
        <button 
        type="button"
        className='button-add' 
        onClick={handleClick}> Get Data </button>
        <div className='list-item'>{post.title}</div>       
        </div>
    )
}

export default Data