import React, { useState } from 'react'
import { useTodo } from '../context'

function TodoItems({todo}) {
    const [isTodoEditable , setTodoEditable] = useState(false)
    const [todoMsg , setTodoMsg] = useState(todo.todo)
    

    const {updateTodo , deleteTodo , toggleTodo } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id , {...todo , todo: todoMsg})
        setTodoEditable(false)
    }
    const todoToggled = () => {
        toggleTodo(todo.id)
    }



  return (
    <div className={`flex ${todo.completed ? "bg-slate-300" : "bg-purple-400"}`} >

      <input type="checkbox"
             className='cursor-progress'
             checked={todo.completed} 
             onChange={todoToggled} />

      <input type="text" 
             className={`${isTodoEditable? "border-black/10 px-2" : "border-transparent"}`} 
             value={todoMsg} 
             readOnly={!isTodoEditable}
             onChange={(e) => setTodoMsg(e.target.value)} />

        <button onClick={() => {
            if(todo.completed) return;
            isTodoEditable ? editTodo() : setTodoEditable(((prev) => !prev));

        }}>{isTodoEditable? "📁":"🖆"}</button>
        <button onClick={() => deleteTodo(todo.id)}>
            Delete
        </button>
    </div>
  )
}

export default TodoItems
