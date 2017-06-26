import React from 'react';
import First from '../first'
import Prolist from '../prolist'
import Second from '../second'
import Header from '../common/header'
import Line from '../common/line'



import {
  Route,
  Link
} from 'react-router-dom'

// let banklogo = require('../../images/zylogo.png')
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
    // console.log(this.props )
    return(
      <div>
        <Header />
        <div className="wrapcontainer">
          <div className="sidebar">
            <StaticMenuLink imgsrc={indexicon} label="首页"/>
            <OldSchoolMenuLink activeOnlyWhenExact={true}  to="/menu" label="首页"/>
            <StaticMenuLink imgsrc={touziicon} label="投资项目管理"/>
            <OldSchoolMenuLink  to="/menu/prolist" label="项目列表"/>
            <OldSchoolMenuLink  to="/menu/listtmp" label="项目模板管理"/>
            <StaticMenuLink imgsrc={accounticon} label="账户管理"/>
            <OldSchoolMenuLink  to="/menu/rolemanage" label="角色管理"/>
            <OldSchoolMenuLink  to="/menu/accoutmanage" label="账户管理"/>
            <StaticMenuLink imgsrc={personicon} label="个人中心"/>
            <OldSchoolMenuLink  to="/menu/editprofile" label="修改资料"/>
            <OldSchoolMenuLink  to="/menu/editpass" label="修改密码"/>
          </div>
          <div className="maincontainer">
            <Route exact path="/menu" component={First}/>
            <Route path="/menu/prolist" component={Prolist}/>
            <Route path="/menu/second" component={Second}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Menus;
