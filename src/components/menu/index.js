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

class Menus extends React.Component{
  state={
    show:true
  }
  hander=()=>{
    this.setState({
      show: !this.state.show
    })
    console.log(this.state.show)
  }
  render(){
    // console.log(this.props.match.params)
    return(
      <div>
        <Header />
        <div className="wrapcontainer">
          <ul className="sidebar">
            <li>
              首页
            </li>
            <li className="selection active" onClick={this.hander}>
              <Link to="/menu">首页</Link>
              <Line />
            </li>
            <li>
              投资项目
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">项目列表</Link>
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">项目模板管理</Link>
            </li>

            <li>
              账户管理
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">角色管理</Link>
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">账户管理</Link>
            </li>

            <li>
              个人中心
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">修改资料</Link>
            </li>
            <li className="selection" onClick={this.hander}>
              <Link to="/menu/second">修改密码</Link>
            </li>
          </ul>
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
