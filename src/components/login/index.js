
import React from 'react';
import Register from '../register';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class Login extends React.Component {
  state = {
     redirectToReferrer: false
   }
   login=()=>{
     this.setState({ redirectToReferrer: true })
   }
  render() {

    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={'/menu'}/>
      )
    }



    return(
        <div className="login">
          <h2>我是login</h2>
          <form className="form-horizontal col-xs-12">
              <div className="form-group">
                  <div className="col-sm-8 col-sm-offset-2">
                      <input type="text" className="form-control" id="inputEmail3" placeholder="用户名" />
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-sm-8 col-sm-offset-2">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="密码" />
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-sm-8 col-sm-offset-2">
                      <div className="checkbox">
                          <label>
                              <input type="checkbox" /> 记住密码
                          </label>
                      </div>
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-xs-10">
                      <div className="pull-right">
                          <Link  className="btn btn-default" to="/register">注册</Link>
                      </div>
                      <div className="pull-right">
                        <div className="btn btn-default" onClick={this.login}>登录</div>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  )
  }
}

export default Login;
