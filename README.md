# redux-refine
Small redux code refining library, which makes the code very enjoyable to work and makes life easier when developing reducers and actions

## Usage
in reducer:
```javascript
// file 'reducers/todo.js'

import { getActionTypes, connectReducers } from 'redux-refine'

// This will be imported by module with combineReducers, 
// for extend global initial state
export const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

const reducers = {

  ADD_TODO: (state, text) => [
    ...state, {
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text
    }
  ],

  DELETE_TODO: (state, id) => state.filter(todo => todo.id !== id),

  EDIT_TODO: (state, { id, text }) => {
    return state.map(todo => todo.id === id ? { ...todo, text } : todo)
  },

  COMPLETE_TODO: (state, id) => state.map(todo => todo.id === id ? { 
    ...todo, 
    completed: !todo.completed 
  } : todo ),

  COMPLETE_ALL: state => {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => ({ ...todo, completed: !areAllMarked }))
  },

  CLEAR_COMPLETED: state => state.filter(todo => todo.completed === false)

}

// Export actions types for actions, no more constants needed
export const actionTypes = getActionTypes(reducers);

// Export reducer for combineReducers 
export default connectReducers(initialState, reducers);
```
in action:
```javascript
// file 'actions/todo.js'

// Now, we are see, what reducer update Store for needed actions
// because action type declared in that reducer
import { actionTypes } from 'reducers/todo'

const { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } = actionTypes;

// Your can use code style, like
// export const addTodo = text => ({ type: types.ADD_TODO, text }
// but I am prefer to use actions hash
const actions = {

  addTodo: text => ({ type: types.ADD_TODO, text }),
  
  deleteTodo: id => ({ type: types.DELETE_TODO, id }),
  
  editTodo: (id, text) => ({ type: types.EDIT_TODO, id, text }),
  
  completeTodo: id => ({ type: types.COMPLETE_TODO, id }),
  
  completeAll: () => ({ type: types.COMPLETE_ALL }),
  
  clearCompleted: () => ({ type: types.CLEAR_COMPLETED })

}

export default actions
```
For compare codestyle and logical understandability of code, You are can compare this with examle of todomvc from here: https://github.com/reactjs/redux/tree/master/examples/todomvc
