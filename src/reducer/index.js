import { combineReducers } from 'redux'

import { LOGOUT } from '../actions/action.js'
import { LOGIN } from '../actions/action.js'

// const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = LOGOUT, action) {
  switch (action.type) {
    case LOGOUT:
      return state
    case LOGIN:
      return state
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'logout':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'login':
      return  [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}


const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
