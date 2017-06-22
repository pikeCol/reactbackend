import React from 'react';
import First from '../first'
import Second from '../second'
import Header from '../common/header'
import Line from '../common/line'



import {
  Route,
  Link
} from 'react-router-dom'

let banklogo = require('../../images/zylogo.png')
let indexicon = require('../../images/indexicon.png')
let touziicon = require('../../images/touziicon.png')
let accounticon = require('../../images/accounticon.png')
let personicon = require('../../images/personicon.png')

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active selection' : 'selection'}>
      <Link to={to}>
        {label}
        {match?<Line />:''}
      </Link>
    </div>
  )}/>
  )

  const StaticMenuLink = ({ label,imgsrc }) => (
      <div className="static">
        <img src={imgsrc} />
        {label}
      </div>
    )

class Menus extends React.Component{
  state={
    show:true
  }
  render(){
    return(
      <div>
        <Header />
        <div className="wrapcontainer">
          <div className="sidebar">
            <StaticMenuLink imgsrc={indexicon} label="首页"/>
            <OldSchoolMenuLink activeOnlyWhenExact={true}  to="/menu" label="首页"/>
            <StaticMenuLink imgsrc={touziicon} label="首页"/>
            <OldSchoolMenuLink  to="/menu/second" label="项目列表"/>
            <StaticMenuLink imgsrc={accounticon} label="首页"/>
            <StaticMenuLink imgsrc={personicon} label="首页"/>
          </div>
          <div className="maincontainer">
            <Route exact path="/menu" component={First}/>
            <Route path="/menu/second" component={Second}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Menus;
