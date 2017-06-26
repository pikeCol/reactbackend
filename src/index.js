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
import todoApp from './reducer'

let store = createStore(todoApp)

store.dispatch({
  type: 'login',
  text: 'Use Redux111'
})
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
      {/* <App /> */}
    </Router>
    </Provider>
),
   document.getElementById('app'));
