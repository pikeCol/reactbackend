import { combineReducers } from 'redux'

import { LOGOUT } from '../actions/action.js'

// const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = 'logout', action) {
  switch (action.type) {
    case 'logout':
      return state
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case LOGOUT:
      return [
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
