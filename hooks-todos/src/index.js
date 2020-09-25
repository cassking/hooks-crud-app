import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const UserContext = React.createContext()
// epxort object to access in components
// has to be used via a provider at top level
// in this case UserContext.Provider
const username = "Cassi"

ReactDOM.render(
  <UserContext.Provider value={username}>
    <App/>
  </UserContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
