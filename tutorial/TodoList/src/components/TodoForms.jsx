import React, { useState } from 'react'
import { useTodo } from '../context'

function TodoItems() {
    const [todo , setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo) return;
        addTodo({todo, completed: false})
        setTodo("")
    }
  return (
    <div>
      <form onSubmit={add}>
        <input type="text" placeholder='Your Todo ....' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  )
}

export default TodoItems

