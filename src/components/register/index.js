import React from 'react'
import Logbtn from '../common/btn'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

 class Register extends React.Component{
   hander(){

   }
  render(){
    return(
        <div className="login">
          <h2>admin reg</h2>
          <form className="form-horizontal">
              <div className="form-group">
                  <div className="col-sm-12">
                      <input type="text" className="form-control" id="inputEmail3" placeholder="用户名（手机号）" />
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-sm-8">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="验证码" />
                  </div>
                  <div className="col-sm-4">
                      <div className="pull-right">
                      </div>
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-xs-12">
                      <div className="pull-right">
                        <Link  className="btn btn-default" to="/register">注册</Link>
                      </div>
                      <div className="pull-right">
                        <Link className="btn btn-default" to="/login">登录</Link>
                      </div>
                  </div>
              </div>
          </form>
        </div>
    )
  }
}

export default Register;
