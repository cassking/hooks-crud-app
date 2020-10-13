
import { v4 as uuidv4 } from 'uuid';

export default function reducer(state, action) {
  switch(action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      }
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
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      
      return {
        ...state,
        currentTodo: isRemovedTodo,// remove to do from search input once deleted
        todos: filteredTodos
      };
      case "ADD_TODO":
        // if (!action.payload) { // prevents from adding empty item in list
        //   return state;
        // }
        // findIndex returns a nubmer but to convert to boolean return add > -1
        //> -1 if it found a valid index... then return true
        //if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
          // also if we are adding a duplicate to do, simply return state
        //   return state;
        // }
        // // const newTodo = { // not needed aftar adding axios post
        //   id: uuidv4(),
        //   text: action.payload,
        //   complete: false,
        // }
        // const addedTodos = [...state.todos, newTodo]
        // last item can now be new item from post api
        const addedTodos = [...state.todos, action.payload]

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
        if (!action.payload) { // prevents from adding empty item in list
          return state;
        }
        // findIndex returns a nubmer but to convert to boolean return add > -1
        //> -1 if it found a valid index... then return true
        if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
          // also if we are adding a duplicate to do, simply return state
          return state;
        }
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