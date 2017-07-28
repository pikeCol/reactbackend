import React from 'react';
import {Icon} from 'antd'
import reqwest from 'reqwest';
import {Redirect} from 'react-router-dom'
let banklogo = require('../../../images/zylogo.png')
// let back = require('../../../images/backicon.png')
// /sys/logout.do
export default class Headers extends React.Component{
  componentWillMount () {
    let storage = window.localStorage
    let usrname = storage.getItem("name")
    this.setState({
      usrname: usrname
    })
  }
  state={
    backlogin:false,
    usrname:''
  }
  back = () => {
    reqwest({
      url:'/sys/logout.do'
    }).then((result) => {
      if (result.restCode ===200 ) {
        localStorage.clear();
        this.setState({
          backlogin:true
        })
      }
    })
  }
  render(){
    if ( this.state.backlogin ) {
      return(
        <Redirect to={'/login'} />
      )
    }
    return(
      <div className="header_wrap">
        <img src={banklogo} className="zylogos"/>
        <div className="left_detail" >
          <span className="usrs">欢迎，{this.state.usrname}</span>
          <span style={{fontSize:'16px'}}>丨</span>
          <span className="goback" onClick={this.back}>
            <span style={{padding:'0 10px'}}><Icon type="poweroff" style={{fontSize:18}} /></span>退出
          </span>
        </div>
      </div>
    )
  }
}
