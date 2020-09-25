import React, { useContext, useReducer }  from 'react';
import { UserContext } from './index';
import 
// how to replace props drilling?
// use reactContext it has a Provider and a Consumer
// Consumer consumes data
// however the useContext hook replaces this
// render props pattern
// OLD WAY
// export default function App() {
//   return <div>
//   <UserContext.Consumer>
//     {value => <div>Hello, {value}</div>}
//   </UserContext.Consumer>
//   </div>;
// }
// nested consumers can cause some confusion
// the useContext hook is straightforward
//  BELOW IS THE HOOKS WAY:
// export default function App() {
//   const value = useContext(UserContext);

//   return (
//     <div>Hello, {value}</div>
//   )
// }

const initialState = {
  count: 0,
};

function reducer(state, action) {
  // state here is initial state = 0
  switch(action.type) {
    case "increment":
    return {
      count: state.count + 1,
    }
    case "decrement":
    return {
      count: state.count - 1,
    }
    case "reset":
    return  initialState
    default:
      return initialState
  }
}

export default function App() {
  const value = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
    Count: {state.count}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
        onClick={() => dispatch({type: "increment"})}>Increment</button>
        <button
        className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-2'
        onClick={() => dispatch({type: "decrement"})}>Decrement</button>
        <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2'
        onClick={() => dispatch({type: "reset"})}>Reset</button>

    </div>
  )
}