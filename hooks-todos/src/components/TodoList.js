import axios from 'axios';
import React, { useContext } from 'react';
import TodosContext from '../context';


export default function TodoList() {
  const {state, dispatch} = useContext(TodosContext);
  const title
    = state.todos.length > 0
      ? `${state.todos.length} items Left  to do on your list`
      : 'Looks like you are all done!'
  return (
  <div className="container mx-auto max-w-md text-center font-sans bg-light-gray">
  <h1 className="text-bold font-serif text-lg">{title}</h1>
  <h4 className="text-sm text-green-800">Double click to change status</h4>
    <ul className="bg-blue">
      {state.todos.map(todo => (
        <li className="flex items-center border-dotted border-2 border-blue my-2 py-4 text-sm" key={todo.id}>
        <span
        onDoubleClick={ async () => {
          const response =  await axios.patch(`https://cors-anywhere.herokuapp.com/hooks-api-smoky.vercel.app/todos/${todo.id}`, {
            complete: !todo.complete,
          })
        dispatch({type: "TOGGLE_TODO", payload: response.data })
        }}
        className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-red-400"}`}>{todo.text}</span>
        <button
        onClick={ () => dispatch({type: "EDIT_TODO", payload: todo })}
        >[ Edit ]</button>
        <button
        //new delete
        onClick={async () => {
          await axios.delete(`https://cors-anywhere.herokuapp.com/hooks-api-smoky.vercel.app/todos/${todo.id}`);
            dispatch({type: "DELETE_TODO", payload: todo });
          }}
          // previous delete
          // onClick={ () => dispatch({type: "DELETE_TODO", payload: todo })}
        >[ Delete ]</button>

        </li>
      ))}
    </ul>
  </div>
   
  )
}