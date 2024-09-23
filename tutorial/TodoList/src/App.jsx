import { useEffect, useState } from 'react'
import './App.css'

import {TodoProvider} from './context/index'
import { TodoForms, TodoItems } from './components'

function App() {
  
  const [todo , setTodos] = useState([])
  
  const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now(), ...todo} , ...prev])
  }

  const updateTodo = (id, todo) => {
      setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prev) => 
     prev.map((prevTodo) => 
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
     )
    )
  }

  useEffect(() => {
     const todos = JSON.parse(localStorage.getItem('todos'))
     if(todos && todos.length > 0) {
      setTodos(todos)
     }
  },[])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todo))
  } , [todo])


  return (
    <TodoProvider value={{todo , addTodo , updateTodo , deleteTodo , toggleTodo}}>

     <h1 className='text-6xl text-center text-blue-600'>Hello React!</h1> 
     <TodoForms />
     {todo.map((td) => (
       <div key={td.id}> <TodoItems todo={td}/> </div>
     ))}
    </TodoProvider>
  )
}

export default App
