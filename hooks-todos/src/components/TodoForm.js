import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';


export default function TodoForm() {
const [todo, setTodo]= useState("");

// since to edit a todo only concerned with
// current todo clicked, we can destructure and set
// initial currentTodo state to empty object
const {state: {currentTodo = {}}, dispatch} = useContext(TodosContext)
// display currentTodo selectedin input field
useEffect(() => {
  if (currentTodo.text) {
    // display text in input
    setTodo(currentTodo.text)
  }
}, [currentTodo.id]) // if  todo id changes then run the effect function


const handleSubmit = (event) => {
  event.preventDefault();

  if (currentTodo.text) {
    dispatch({type: "UPDATE_TODO", payload: todo})
  } else {
    dispatch({type: "ADD_TODO", payload: todo});

  }
  setTodo("")
}

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex justify-center p-5">
    <input
      type="text"
      className="border-black border-solid border-2"
      onChange={ (event) => setTodo(event.target.value)}
      value={todo}/>
    </form>
  )

}