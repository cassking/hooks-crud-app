export default function reducer(state, action) {
  switch(action.type) {
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map( (todo) =>
      // if to do ids match
        todo.id === action.payload.id
        ? { ...action.payload,complete: !action.payload.complete }
        : todo
        )
        return {
          ...state,
          todos: toggledTodos
        }
    default:
      return state;
  }
};