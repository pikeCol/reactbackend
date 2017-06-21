require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Login from './login';
import Register from './register';
import Home from './home';
import Menus from './menu';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'


class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/menu' component={Menus}/>
        </Switch>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
