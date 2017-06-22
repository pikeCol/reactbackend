require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Login from './login';
import Home from './home';
import Menus from './menu';
import NoMatch from './notmatch';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'



class AppComponent extends React.Component {
  render() {
    return (
      <div className="index container-fluid">
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route path='/menu' component={Menus}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

AppComponent.defaultProps = {
  test:1
};

export default AppComponent;
