import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { createStore } from 'redux'
import todoApp from './reducer'

let store = createStore(todoApp)

store.dispatch({
  type: 'logout',
  text: 'Use Redux'
})
console.log(store.getState())
// Render the main component into the dom
ReactDOM.render(
  (
    <Router>
      <Route component={App} />
      {/* <App /> */}
    </Router>
),
   document.getElementById('app'));
