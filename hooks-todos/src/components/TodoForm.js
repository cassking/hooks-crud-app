import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export default function TodoForm() {
const [todo, setTodo]= useState("");

// since to edit a todo only concerned with
// current todo clicked, we can destructure and set
// initial currentTodo state to empty object
const {state: {currentTodo = {}}, dispatch} = useContext(TodosContext)
// display currentTodo selectedin input field
useEffect(() => { // sets the text inside input field
  if (currentTodo.text) {
    // display text in input
    setTodo(currentTodo.text)
  } else {//if to do deleted while text is in input set it to empty string
    setTodo("")// clear input with empty string
  }
}, [currentTodo.id]) // if  todo id changes then run the effect function


const handleSubmit =  async (event) => {
  // we will make handleSubmit an async function to use the api fetch call
  event.preventDefault();

  if (currentTodo.text) {
    // do we have a current todo in state? if so..
    dispatch({type: "UPDATE_TODO", payload: todo})
  } else {// if we dont have a to do add one
    const response = await axios.post('https://cors-anywhere.herokuapp.com/hooks-api-smoky.vercel.app/todos/',
    // second argument is what we want to pass
    {
      id: uuidv4(),
      text: todo,
      complete: false,
    })
    dispatch({type: "ADD_TODO", payload: response.data});

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