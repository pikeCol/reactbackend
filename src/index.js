import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import todoApp from './reducer'

const editableAction = {type: 'editable'};
const diseditableAction = {type: 'diseditable'};

function iseditable(state={isedit: false}, action) {
    let isedit = state.isedit;
  switch(action.type){
    case 'editable':
      return {isedit: true};
    case 'diseditable':
      return {isedit: false};
    default:
      return state;
  }
}

let store = createStore(iseditable)

// store.dispatch({
//   type: 'login',
//   text: 'Use Redux111'
// })
// setTimeout(function(){
//   console.log(store.getState())
// },300)
// console.log(store.getState())
// Render the main component into the dom
ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>
),
   document.getElementById('app'));
