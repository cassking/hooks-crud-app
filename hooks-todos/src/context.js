import React from 'react';
// this will be the initial state object
const TodosContext = React.createContext({
  todos: [
    { id: 1, text: "Check AM resting HR", complete: false },
    { id: 2, text: "Anaerobic and V02 max intervals,AM", complete: false },
    { id: 3, text: "Recovery ride, PM", complete: false },
    { id: 4, text: "Check PM resting HR", complete: true }
  ]
});

export default TodosContext;