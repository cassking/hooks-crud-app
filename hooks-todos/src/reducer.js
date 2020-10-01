
import { v4 as uuidv4 } from 'uuid';

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
        };

    case "DELETE_TODO":
      const filteredTodos = state.todos.filter((todo) =>
      todo.id !== action.payload.id)
      return {
        ...state,
        todos: filteredTodos
      };
      case "ADD_TODO":
        const newTodo = {
          id: uuidv4(),
          text: action.payload,
          complete: false,
        }
        const addedTodos = [...state.todos, newTodo]
        return {
          ...state,
          todos: addedTodos
        }
      case "EDIT_TODO":
        return {
          ...state,
          currentTodo: action.payload 
        }

      case "UPDATE_TODO":
        const updatedTodo = { ...state.currentTodo, text: action.payload }
        const updatedTodoIndex = state.todos.findIndex(
          todo => todo.id === state.currentTodo.id
        )
        const updatedTodos = [
          ...state.todos.slice(0,updatedTodoIndex),
          updatedTodo,
          ...state.todos.slice(updatedTodoIndex +1)
        ]

        return {
          ...state,
          currentTodo: {},
          todos: updatedTodos
        }
    default:
      return state;
  }
};