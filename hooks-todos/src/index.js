import React, { useContext, useEffect, useReducer, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import App from './App'; uncomment to see App.js
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const useAPI = endpoint => {
 const [data, setData] =  useState([]);
 // to call endpoint when component is mounted use useEffect

 useEffect( () => {
  getData();
 }, [])
 const getData = async () => {
   const response = await axios.get(endpoint);
   setData(response.data);
 }
 return data;
}
const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // create a custom hook to get initalState from the  https://hooks-api-smoky.vercel.app/todos api
  // alow cors with cors-anywhere.herokuapp.com prefix

  const savedTodos = useAPI("https://cors-anywhere.herokuapp.com/hooks-api-smoky.vercel.app/todos");

  useEffect( () => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
    // only dispatch wehn todos change so add dependency in array
  }, [savedTodos])


  // we can now return all top level components in our app
    // in between the Provider
  return (
  
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm/>
      <TodoList />
    </TodosContext.Provider>
  )
}
ReactDOM.render(
    <App />,
  document.getElementById('root')
);


serviceWorker.unregister();


//FIRST CODE TRY BELOW
//export const UserContext = React.createContext()
// epxort object to access in components
// has to be used via a provider at top level
// in this case UserContext.Provider
//const username = "Cassi"

// ReactDOM.render(
//   <UserContext.Provider value={username}>
//     <App/>
//   </UserContext.Provider>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA