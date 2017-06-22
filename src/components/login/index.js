
import React from 'react';
import Titles from '../common/title';

let codeImage = require('../../images/code_edit.png');


import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'


class Login extends React.Component {
  state = {
     redirectToReferrer: false,
     islogin: false
   }
   login=()=>{
    //  请求
     this.setState({
       redirectToReferrer: true
     })
   }
  render() {

    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={'/menu'}/>
      )
    }



    return(
      <div className="login_wrap">
        <div className="login">
          <Titles />
          <form className="form-horizontal col-xs-12">
              <div className="form-group centers">
                  <div className="col-sm-9 ">
                      <input type="text" className="form-control" id="inputEmail3" placeholder="请输入用户名" />
                  </div>
              </div>
              <div className="form-group centers">
                  <div className="col-sm-9 ">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="请输入密码" />
                  </div>
              </div>
              <div className="form-group centers">
                  <div className="col-sm-6 pull-left incode">
                    <input type="text" className="form-control"  placeholder="请输入验证码" />
                  </div>
                  <div className="pull-right code">
                    <img src={codeImage} />
                  </div>
              </div>
              <div className="form-group" style={{
                display:'flex',
                position: 'relative',
                justifyContent: 'center'
              }}>
                  {
                    this.state.islogin?
                    <div className="alert alert-danger" role="alert" style={{
                      position:'absolute',
                      top:'-10px',
                      padding: '3px',
                      width:'333px'
                    }}>
                        您输入的账号或密码有误
                    </div>
                    :''
                  }
                  <div className="btn btn-warning logbtn" onClick={this.login}>登  录</div>
              </div>
          </form>
        </div>
      </div>
  )
  }
}

export default Login;
