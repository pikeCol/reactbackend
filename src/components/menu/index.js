import React from 'react';
import First from '../first'
import Second from '../second'
import {
  Route,
  Link
} from 'react-router-dom'


class Menus extends React.Component{
  render(){
    return(
      <div>
        <h1>我是首页</h1>
        <ul>
          <li><Link to="/menu/first">Netflix</Link></li>
          <li><Link to="/menu/second">Zillow Group</Link></li>
        </ul>
        <div>
          <Route path="/menu/first" component={First}/>
          <Route path="/menu/second" component={Second}/>
        </div>
      </div>
    )
  }
}
export default Menus;
