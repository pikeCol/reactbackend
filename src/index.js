import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/Main';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import todoApp from './reducer'



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

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>
),
   document.getElementById('app'));
