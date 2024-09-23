import {createContext , useContext} from "react";


export const TodoContext = createContext({
    todo: [
        {
            id: 1,
            todo:"Message for me",
            completed:true,
        }
    ],
    addTodo:(todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleTodo: (id) => {},
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider