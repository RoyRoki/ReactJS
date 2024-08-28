import React, {useState} from 'react'
import {useDispatch} from 'redux'
import {addTodo , removeTodo} from '../features/todo/todoSlice'



function AddTodo() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault()

        dispatch(addTodo(input))
        setInput('')
    }
  return (
    <div>
     <form onSubmit={addTodoHandler}>
       <input type="text" />      
       <button type='submit'>Add</button>
    </form> 
    </div>
  )
}

export default AddTodo
