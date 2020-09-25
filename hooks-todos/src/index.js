import React, { useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
// import App from './App'; uncomment to see App.js
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';

const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // we can now return all top level components in our app
    // in between the Provider
  return (
  
    <TodosContext.Provider value={{ state, dispatch }}>
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